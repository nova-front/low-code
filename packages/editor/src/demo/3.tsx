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
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let charCount = 0;
  let found = false;

  while (walker.nextNode() && !found) {
    const textNode = walker.currentNode;
    if (textNode === node) {
      charCount += offset;
      found = true;
      break;
    }
    charCount += textNode.textContent?.length || 0;
  }

  // 继续遍历剩余节点确保计数准确
  while (!found && walker.nextNode()) {
    charCount += walker.currentNode.textContent?.length || 0;
  }

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

    // 同步外部值变化
    useEffect(() => {
      if (!divRef.current || value === lastHtml.current) return;

      divRef.current.innerHTML = value;
      lastHtml.current = value;

      // 同步后恢复选择状态
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
    }, [value, selection]);

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

// 支持撤销重做的编辑器
export const UndoableEditor = () => {
  const [state, { undo, redo, set: setState, canUndo, canRedo }] =
    useUndo<EditorState>({
      content: "",
      selection: { start: 0, end: 0 },
    });

  const editorRef = useRef<ContentEditableHandle>(null);

  // 使用 ref 保持防抖函数稳定性
  const debounceRef = useRef(
    debounce((newState: EditorState) => setState(newState), 300)
  );

  // 同步防抖函数与最新 setState
  useEffect(() => {
    debounceRef.current = debounce(
      (newState: EditorState) => setState(newState),
      300
    );
    return () => debounceRef.current.cancel();
  }, [setState]);

  // 创建稳定的回调函数
  const handleChange = useCallback((newState: EditorState) => {
    debounceRef.current(newState);
  }, []);

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button
          onClick={undo}
          disabled={!canUndo}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          撤销 (Ctrl+Z)
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          重做 (Ctrl+Y)
        </button>
      </div>

      <ContentEditable
        ref={editorRef}
        value={state.present.content}
        selection={state.present.selection}
        onChange={handleChange}
        placeholder="输入内容..."
        //   style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '8px' }}
      />
    </div>
  );
};

export default UndoableEditor;
