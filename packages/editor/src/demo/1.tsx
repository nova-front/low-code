import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import useUndo from "use-undo";
import { debounce } from "lodash-es";

interface EditorState {
  content: string;
  selection: { start: number; end: number };
}

// 光标位置管理工具函数
const getCharacterOffset = (
  container: HTMLElement,
  node: Node,
  offset: number
): number => {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) => {
        // 跳过不可见元素
        if (node.nodeType === Node.ELEMENT_NODE) {
          const style = window.getComputedStyle(node as Element);
          if (style.display === "none" || style.visibility === "hidden") {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let charCount = 0;
  let found = false;

  do {
    const currentNode = walker.currentNode;

    if (currentNode.nodeType === Node.TEXT_NODE) {
      const textLength = currentNode.textContent?.length || 0;

      if (currentNode === node) {
        charCount += Math.min(offset, textLength);
        found = true;
        break;
      }
      charCount += textLength;
    } else if (currentNode.nodeName === "BR") {
      // 处理换行符
      charCount += 1;
    }
  } while (walker.nextNode());

  return charCount;
};

const findNodeAndOffset = (container: HTMLElement, targetOffset: number) => {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let charCount = 0;

  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    const textLength = textNode.length;

    if (charCount + textLength >= targetOffset) {
      return { node: textNode, offset: targetOffset - charCount };
    }
    charCount += textLength;
  }

  return { node: container, offset: container.childNodes.length };
};

// 内容编辑组件
interface ContentEditableProps {
  value?: string;
  selection?: { start: number; end: number };
  onChange?: (state: {
    content: string;
    selection: { start: number; end: number };
  }) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface ContentEditableHandle {
  focus: () => void;
  setSelection: (selection: { start: number; end: number }) => void;
}

const ContentEditable = forwardRef<ContentEditableHandle, ContentEditableProps>(
  ({ value = "", selection, onChange, placeholder, className, style }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const lastHtml = useRef(value);

    useEffect(() => {
      if (!divRef.current || divRef.current.innerHTML === value) return;

      // 标记为外部更新
      const isExternalUpdate = value !== lastHtml.current;
      if (isExternalUpdate) {
        // 保存当前滚动位置
        const scrollTop = divRef.current.scrollTop;

        // 执行DOM更新
        divRef.current.innerHTML = value;
        lastHtml.current = value;

        // 恢复选择状态
        if (selection) {
          const { start, end } = selection;
          const range = document.createRange();
          const startPos = findNodeAndOffset(divRef.current, start);
          const endPos = findNodeAndOffset(divRef.current, end);

          try {
            range.setStart(startPos.node, startPos.offset);
            range.setEnd(endPos.node, endPos.offset);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
          } catch (e) {
            console.warn("Failed to restore selection:", e);
          }
        }

        // 恢复滚动位置
        divRef.current.scrollTop = scrollTop;
      }
    }, [value, selection]); // 仅在外部value变化时更新

    // 处理内容变化
    const handleInput = useCallback(() => {
      if (!divRef.current || isComposing) return;

      // 获取当前选择状态
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const start = getCharacterOffset(
        divRef.current,
        range.startContainer,
        range.startOffset
      );
      const end = getCharacterOffset(
        divRef.current,
        range.endContainer,
        range.endOffset
      );

      onChange?.({
        content: divRef.current.innerHTML,
        selection: { start, end },
      });
    }, [onChange, isComposing]);

    // 暴露API
    useImperativeHandle(ref, () => ({
      focus: () => divRef.current?.focus(),
      setSelection: (sel) => {
        if (!divRef.current) return;
        const range = document.createRange();
        const startPos = findNodeAndOffset(divRef.current, sel.start);
        const endPos = findNodeAndOffset(divRef.current, sel.end);

        try {
          range.setStart(startPos.node, startPos.offset);
          range.setEnd(endPos.node, endPos.offset);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        } catch (e) {
          console.warn("Failed to set selection:", e);
        }
      },
    }));

    const showPlaceholder = !isFocused && !divRef.current?.textContent?.trim();

    return (
      <div style={{ position: "relative", ...style }} className={className}>
        <div
          ref={divRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          style={{
            minHeight: "100px",
            padding: "8px",
            outline: "none",
            whiteSpace: "pre-wrap",
            border: "1px solid #ddd",
            borderRadius: "4px",
            lineHeight: "1.5",
          }}
        />
        {showPlaceholder && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              color: "#999",
              pointerEvents: "none",
            }}
          >
            {placeholder}
          </div>
        )}
      </div>
    );
  }
);

// 类型定义
export interface UndoableEditorHandle {
  undo: () => void;
  redo: () => void;
  getState: () => EditorState;
}

// 修改后的组件定义
export const UndoableEditor = forwardRef<UndoableEditorHandle>((_, ref) => {
  const [state, { undo, redo, set: setState, canUndo, canRedo }] =
    useUndo<EditorState>({
      content: "",
      selection: { start: 0, end: 0 },
    });

  const editorRef = useRef<ContentEditableHandle>(null);
  const isInternalUpdate = useRef(false);
  const lastKeyPressed = useRef<string | null>(null);

  // 防抖配置（300ms普通输入，立即提交的特殊按键）
  const debouncedSetState = useRef(
    debounce(
      (newState: EditorState) => {
        if (!isInternalUpdate.current) {
          setState(newState);
        }
      },
      300,
      { leading: false, trailing: true }
    )
  );

  // 立即提交的特殊按键（Enter、Backspace等）
  const shouldFlushImmediately = (key: string) => {
    return ["Enter", "Backspace", "Delete"].includes(key);
  };

  // 暴露API
  useImperativeHandle(
    ref,
    () => ({
      undo: () => {
        isInternalUpdate.current = true;
        undo();
        setTimeout(() => (isInternalUpdate.current = false));
      },
      redo: () => {
        isInternalUpdate.current = true;
        redo();
        setTimeout(() => (isInternalUpdate.current = false));
      },
      getState: () => state.present,
    }),
    [state, undo, redo]
  );

  const handleChange = useCallback(
    (newState: EditorState) => {
      if (isInternalUpdate.current) return;

      // 特殊按键立即提交
      if (
        lastKeyPressed.current &&
        shouldFlushImmediately(lastKeyPressed.current)
      ) {
        debouncedSetState.current.cancel();
        setState(newState);
      } else {
        debouncedSetState.current(newState);
      }

      lastKeyPressed.current = null;
    },
    [setState]
  );

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      lastKeyPressed.current = e.key;

      // 快捷键处理（保留原有逻辑）
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        undo();
      } else if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") ||
        ((e.ctrlKey || e.metaKey) && e.key === "y")
      ) {
        e.preventDefault();
        redo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  return (
    <ContentEditable
      ref={editorRef}
      value={state.present.content}
      selection={state.present.selection}
      onChange={handleChange}
    />
  );
});
export default UndoableEditor;
