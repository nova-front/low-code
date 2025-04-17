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

// 光标管理 Hook
const useCursorManager = (contentRef: React.RefObject<HTMLElement>) => {
  const selectionRef = useRef<{
    startContainer: Node;
    startOffset: number;
    endContainer: Node;
    endOffset: number;
  } | null>(null);

  // 保存当前光标位置
  const saveCursor = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !contentRef.current) return;

    const range = selection.getRangeAt(0);
    if (!contentRef.current.contains(range.startContainer)) return;

    selectionRef.current = {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset,
    };
  }, [contentRef]);

  // 恢复光标位置
  const restoreCursor = useCallback(() => {
    if (!selectionRef.current || !contentRef.current) return;

    const { startContainer, startOffset, endContainer, endOffset } =
      selectionRef.current;
    const selection = window.getSelection();
    if (!selection) return;

    // 创建新的 Range
    const range = document.createRange();

    // 尝试恢复选区
    try {
      // 检查节点是否仍然在 DOM 中
      const isValidNode = (node: Node) => {
        return (
          document.body.contains(node) && contentRef.current?.contains(node)
        );
      };

      const startNode = isValidNode(startContainer)
        ? startContainer
        : contentRef.current;
      const endNode = isValidNode(endContainer)
        ? endContainer
        : contentRef.current;

      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
    } catch (e) {
      // 恢复失败时移动到末尾
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }, [contentRef]);

  return { saveCursor, restoreCursor };
};

// 内容编辑组件
interface ContentEditableProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface ContentEditableHandle {
  focus: (options?: { position?: "start" | "end" | "preserve" }) => void;
}

const ContentEditable = forwardRef<ContentEditableHandle, ContentEditableProps>(
  ({ value = "", onChange, placeholder, className, style }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const lastHtml = useRef(value);
    const { saveCursor, restoreCursor } = useCursorManager(
      divRef as unknown as React.RefObject<HTMLElement>
    );

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      focus: (options = {}) => {
        if (!divRef.current) return;

        divRef.current.focus();
        const selection = window.getSelection();
        if (!selection) return;

        const range = document.createRange();

        switch (options.position) {
          case "start":
            range.setStart(divRef.current, 0);
            range.collapse(true);
            break;
          case "preserve":
            restoreCursor();
            return;
          default: // 'end'
            range.selectNodeContents(divRef.current);
            range.collapse(false);
        }

        selection.removeAllRanges();
        selection.addRange(range);
      },
    }));

    // 同步外部值变化
    useEffect(() => {
      if (!divRef.current || value === lastHtml.current) return;

      saveCursor(); // 在更新前保存光标位置
      divRef.current.innerHTML = value;
      lastHtml.current = value;

      // 微任务队列中恢复光标
      Promise.resolve().then(restoreCursor);
    }, [value, saveCursor, restoreCursor]);

    // 处理输入变化（带防抖）
    const handleInput = useCallback(() => {
      if (!isComposing && divRef.current) {
        saveCursor();
        const newHtml = divRef.current.innerHTML;
        lastHtml.current = newHtml;
        onChange?.(newHtml);
      }
    }, [onChange, isComposing, saveCursor]);

    // 处理粘贴（纯文本）
    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
        saveCursor();
      },
      [saveCursor]
    );

    // 显示占位符的条件
    const showPlaceholder = !isFocused && !divRef.current?.textContent?.trim();

    return (
      <div style={{ position: "relative", ...style }} className={className}>
        <div
          ref={divRef}
          contentEditable
          onPaste={handlePaste}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            // 保存回车键的光标位置
            if (e.key === "Enter") saveCursor();
          }}
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
        {showPlaceholder && <div style={placeholderStyle}>{placeholder}</div>}
      </div>
    );
  }
);

// 带撤销/重做功能的编辑器
export const UndoableEditor = () => {
  const MAX_HISTORY = 100;
  const [contentState, { undo, redo, set: setContent, canUndo, canRedo }] =
    useUndo("");

  const editorRef = useRef<ContentEditableHandle>(null);
  const [isComposing, setIsComposing] = useState(false);

  // 防抖的更新函数（300ms）
  const debouncedSetContent = useCallback(
    debounce((value: string) => {
      setContent(value);
    }, 300),
    [setContent]
  );

  // 清理防抖
  useEffect(() => () => debouncedSetContent.cancel(), []);

  // 处理内容变化
  const handleChange = useCallback(
    (value: string) => {
      debouncedSetContent(value);
    },
    [debouncedSetContent]
  );

  // 撤销/重做操作
  const performUndo = useCallback(() => {
    if (!canUndo) return;
    undo();
    editorRef.current?.focus({ position: "preserve" });
  }, [undo, canUndo]);

  const performRedo = useCallback(() => {
    if (!canRedo) return;
    redo();
    editorRef.current?.focus({ position: "preserve" });
  }, [redo, canRedo]);

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComposing) return;

      // Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        performUndo();
      }
      // Ctrl/Cmd + Shift + Z 或 Ctrl/Cmd + Y
      else if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") ||
        ((e.ctrlKey || e.metaKey) && e.key === "y")
      ) {
        e.preventDefault();
        performRedo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [performUndo, performRedo, isComposing]);

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <button
          onClick={performUndo}
          disabled={!canUndo}
          style={buttonStyle}
          title="撤销 (Ctrl+Z)"
        >
          ↺ 撤销
        </button>
        <button
          onClick={performRedo}
          disabled={!canRedo}
          style={{ ...buttonStyle, marginLeft: "8px" }}
          title="重做 (Ctrl+Y 或 Ctrl+Shift+Z)"
        >
          ↻ 重做
        </button>
        <div style={historyStatusStyle}>
          历史记录: {contentState.past.length}/{MAX_HISTORY}
        </div>
      </div>

      <ContentEditable
        ref={editorRef}
        value={contentState.present}
        onChange={handleChange}
        placeholder="输入内容..."
        style={editorStyle}
      />

      <div style={statusBarStyle}>
        <span>字符数: {contentState.present.length}</span>
        <span>行数: {contentState.present.split("\n").length}</span>
      </div>
    </div>
  );
};

// 样式常量
const placeholderStyle = {
  position: "absolute",
  top: "8px",
  left: "8px",
  color: "#999",
  pointerEvents: "none",
  userSelect: "none",
} as const;

const containerStyle = {
  maxWidth: "800px",
  margin: "20px auto",
  fontFamily: "system-ui, sans-serif",
} as const;

const toolbarStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
  gap: "12px",
} as const;

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s",
  ":hover": {
    backgroundColor: "#e9e9e9",
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "#f5f5f5",
  },
} as const;

const historyStatusStyle = {
  color: "#666",
  fontSize: "0.9em",
  marginLeft: "auto",
} as const;

const editorStyle = {
  // border: '1px solid #eee',
  borderRadius: "4px",
  minHeight: "200px",
  // padding: '12px',
  // boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
} as const;

const statusBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "8px",
  color: "#666",
  fontSize: "0.8em",
} as const;

export default UndoableEditor;
