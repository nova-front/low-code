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
import { ContentEditable, ContentEditableHandle } from "../content-editable";

interface EditorState {
  content: string;
  selection: { start: number; end: number };
}

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
