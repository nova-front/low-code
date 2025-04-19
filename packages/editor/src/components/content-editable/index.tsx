import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  ReactNode,
  useMemo,
} from "react";
import { WaveUnderline } from "../wave-underline";
import { findNodeAndOffset, getCharacterOffset } from "../../utils";
import { generateTestData } from "../wave-underline/utils";

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
  spellcheck?: boolean;
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
      spellcheck = false,
    }: ContentEditableProps,
    ref
  ): ReactNode => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const lastHtml = useRef(value);
    const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      fontSize: 12,
      lineHeight: 1.5,
    });

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

    // 在组件内部添加paste处理函数
    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text/plain");
        const selection = window.getSelection();
        if (!selection || !divRef.current) return;

        // 创建文档片段保存粘贴内容
        const fragment = document.createDocumentFragment();
        const textNode = document.createTextNode(pastedText);
        fragment.appendChild(textNode);

        // 插入内容并保持选区正确
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(fragment);

        // 调整选区到插入内容末尾
        const newRange = document.createRange();
        newRange.setStart(
          divRef.current,
          getCharacterOffset(divRef.current, textNode, pastedText.length)
        );
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);

        // 立即触发输入更新
        handleInput();
      },
      [handleInput]
    );

    const showPlaceholder = !isFocused && !divRef.current?.textContent?.trim();

    // TODO: 后续删除
    const testData = useMemo(() => {
      return generateTestData({
        canvasWidth: dimensions.width,
        canvasHeight: dimensions.height,
        fontSize: dimensions.fontSize,
        lineHeightMultiplier: dimensions.lineHeight,
      });
    }, [
      dimensions.fontSize,
      dimensions.height,
      dimensions.lineHeight,
      dimensions.width,
    ]);

    useEffect(() => {
      const element = divRef.current;
      if (!element) return;

      const computedStyle = window.getComputedStyle(element);

      // 解析字体大小（去除单位 px）
      const fontSize = parseInt(computedStyle.fontSize, 10) || 16;

      // 解析行高（处理 normal/数字/带单位的值）
      let lineHeight: number;
      const lh = computedStyle.lineHeight;

      if (lh === "normal") {
        // 浏览器默认行高通常为 1.2
        lineHeight = Math.round(fontSize * 1.2);
      } else if (lh.includes("px")) {
        lineHeight = parseInt(lh, 10);
      } else if (lh.includes("%")) {
        lineHeight = Math.round((fontSize * parseFloat(lh)) / 100);
      } else {
        // 处理无单位数字（如 1.5）
        lineHeight = Math.round(fontSize * parseFloat(lh));
      }

      const updateDimensions = () => {
        setDimensions({
          width: element.offsetWidth,
          height: element.offsetHeight,
          top: element.offsetTop,
          left: element.offsetLeft,
          fontSize: fontSize,
          lineHeight: lineHeight / fontSize,
        });
      };

      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(element);
      updateDimensions(); // 初始调用

      return () => resizeObserver.disconnect();
    }, []);

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

    return (
      <div
        style={{
          position: "relative",
          padding: "4px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          ...style,
        }}
        className={className}
      >
        <div
          ref={divRef}
          contentEditable
          onPaste={handlePaste}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          style={{
            minHeight: "100px",
            outline: "none",
            whiteSpace: "pre-wrap",
            lineHeight: "1.5",
          }}
        />
        {spellcheck && (
          <WaveUnderline
            ranges={testData}
            color="#ff3366"
            width={dimensions.width}
            height={dimensions.height}
            top={dimensions.top}
            left={dimensions.left}
          />
        )}
        {showPlaceholder && (
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
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
