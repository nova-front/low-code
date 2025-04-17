import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  ReactNode,
} from "react";
import { findNodeAndOffset, getCharacterOffset } from "../../utils";

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
  children?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface ContentEditableHandle {
  focus: () => void;
  setSelection: (selection: { start: number; end: number }) => void;
  getElement: () => HTMLDivElement | null;
}

export const ContentEditable = forwardRef<
  ContentEditableHandle,
  ContentEditableProps
>(
  (
    {
      value = "",
      selection,
      onChange,
      placeholder,
      className,
      style,
      children,
      onFocus,
      onBlur,
    }: ContentEditableProps,
    ref
  ): ReactNode => {
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

    // 合并焦点状态处理
    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

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
      getElement: () => divRef.current,
    }));

    const showPlaceholder = !isFocused && !divRef.current?.textContent?.trim();

    return (
      <div style={{ position: "relative", ...style }} className={className}>
        <div
          ref={divRef}
          contentEditable
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
        {children}
      </div>
    );
  }
);
