import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  ReactNode,
} from "react";
import { WaveUnderline } from "../wave-underline";
import {
  findNodeAndOffset,
  getCharacterOffset,
  getTextPositionsWithDictionary,
  TextPosition,
} from "../../utils";
import { useWidthChangeObserver } from "../../hooks/useWidthChangeObserver";
import { useDebounce } from "../../hooks/useDebounce";
import { EnglishDictionary } from "../../utils/dictionary";

export interface ContentEditableProps {
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
    const contentRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const lastHtml = useRef(value);
    const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    });
    const [ranges, setRanges] = useState<TextPosition[]>([]);

    const updatePositions = () => {
      const words = [
        "i",
        "am",
        "apple",
        "banana",
        "orange",
        "pear",
        "hello",
        "world",
        "typescript",
        "javascript",
        "example",
        // ...可扩展更多单词
      ];
      const dictionary = new EnglishDictionary(words);
      if (contentRef.current && spellcheck) {
        const ranges = getTextPositionsWithDictionary(
          contentRef.current!,
          dictionary
        );
        setRanges(ranges);
      }
    };

    const debouncedSpellCheck = useDebounce(() => {
      updatePositions();
    }, 300);

    useEffect(() => {
      if (!contentRef.current || contentRef.current.innerHTML === value) return;

      // 标记为外部更新
      const isExternalUpdate = value !== lastHtml.current;
      if (isExternalUpdate) {
        // 保存当前滚动位置
        const scrollTop = contentRef.current.scrollTop;

        // 执行DOM更新
        contentRef.current.innerHTML = value;
        lastHtml.current = value;

        // 恢复选择状态
        if (selection) {
          const { start, end } = selection;
          const range = document.createRange();
          const startPos = findNodeAndOffset(contentRef.current, start);
          const endPos = findNodeAndOffset(contentRef.current, end);

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
        contentRef.current.scrollTop = scrollTop;
      }
    }, [value, selection]); // 仅在外部value变化时更新

    // 处理内容变化
    const handleInput = useCallback(() => {
      if (!contentRef.current || isComposing) return;

      // 获取当前选择状态
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const start = getCharacterOffset(
        contentRef.current,
        range.startContainer,
        range.startOffset
      );
      const end = getCharacterOffset(
        contentRef.current,
        range.endContainer,
        range.endOffset
      );

      onChange?.({
        content: contentRef.current.innerHTML,
        selection: { start, end },
      });

      debouncedSpellCheck();
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

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text/plain");
        const selection = window.getSelection();

        if (!selection || !contentRef.current) return;

        // 删除当前选中的内容（如果有）
        const range = selection.getRangeAt(0);
        range.deleteContents();

        // 插入纯文本节点
        const textNode = document.createTextNode(pastedText);
        range.insertNode(textNode);

        // 将光标移动到插入内容的末尾
        const newRange = document.createRange();
        newRange.setStartAfter(textNode);
        newRange.collapse(true);

        // 更新选区
        selection.removeAllRanges();
        selection.addRange(newRange);

        // 触发输入更新
        handleInput();
      },
      [handleInput]
    );

    const showPlaceholder =
      !isFocused && !contentRef.current?.textContent?.trim();

    // 初始化 WaveUnderline 基础属性，并根据 contentRef 进行调整
    useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      const updateDimensions = () => {
        setDimensions({
          width: element.offsetWidth,
          height: element.offsetHeight,
          top: element.offsetTop,
          left: element.offsetLeft,
        });
      };

      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(element);
      updateDimensions(); // 初始调用

      return () => resizeObserver.disconnect();
    }, []);

    // 监测屏幕宽度
    useWidthChangeObserver(
      contentRef as React.RefObject<HTMLElement>,
      (width) => {
        updatePositions();
      }
    );

    // 暴露API
    useImperativeHandle(ref, () => ({
      focus: () => contentRef.current?.focus(),
      setSelection: (sel) => {
        if (!contentRef.current) return;
        const range = document.createRange();
        const startPos = findNodeAndOffset(contentRef.current, sel.start);
        const endPos = findNodeAndOffset(contentRef.current, sel.end);

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
      getElement: () => contentRef.current,
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
          ref={contentRef}
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
            ranges={ranges}
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
