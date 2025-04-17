import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";

interface ContentEditableProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface ContentEditableHandle {
  focus: () => void;
}

const ContentEditable = forwardRef<ContentEditableHandle, ContentEditableProps>(
  ({ value = "", onChange, placeholder, className, style }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const lastHtml = useRef(value);

    // 暴露 focus 方法给父组件
    useImperativeHandle(ref, () => ({
      focus: () => divRef.current?.focus(),
    }));

    // 同步外部 value 变化
    useEffect(() => {
      if (divRef.current && value !== lastHtml.current) {
        divRef.current.innerHTML = value;
        lastHtml.current = value;
      }
    }, [value]);

    // 处理粘贴纯文本
    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        const selection = window.getSelection();

        if (selection && divRef.current) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const textNode = document.createTextNode(text);
          range.insertNode(textNode);

          // 正确的方法：将光标移动到新插入的文本之后
          const newRange = document.createRange();
          newRange.setStartAfter(textNode);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);

          // 触发更新
          const newHtml = divRef.current.innerHTML;
          lastHtml.current = newHtml;
          onChange?.(newHtml);
        }
      },
      [onChange]
    );

    // 处理复制纯文本
    const handleCopy = useCallback((e: React.ClipboardEvent) => {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection) {
        e.clipboardData.setData("text/plain", selection.toString());
      }
    }, []);

    // 处理输入变化
    const handleInput = useCallback(() => {
      const newHtml = divRef.current?.innerHTML || "";
      lastHtml.current = newHtml;
      onChange?.(newHtml);
    }, [onChange]);

    // 判断是否显示 placeholder
    const showPlaceholder = !isFocused && !divRef.current?.textContent?.trim();

    return (
      <div style={{ position: "relative", ...style }} className={className}>
        <div
          ref={divRef}
          contentEditable
          onPaste={handlePaste}
          onCopy={handleCopy}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            minHeight: "100px",
            padding: "8px",
            outline: "none",
            whiteSpace: "pre-wrap",
            border: "1px solid #eee",
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
              userSelect: "none",
            }}
          >
            {placeholder}
          </div>
        )}
      </div>
    );
  }
);

export default ContentEditable;
