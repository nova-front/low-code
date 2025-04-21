import {
  ContentEditable,
  UndoableEditor,
  UndoableEditorHandle,
} from "@repo/editor";
import { useRef } from "react";

function App() {
  const undoableEditorRef = useRef<UndoableEditorHandle>(null);
  return (
    <div>
      <h2>DOM + ContentEditable 实现 TextArea 基础功能</h2>
      <div>
        <ContentEditable spellcheck placeholder="请输入" />
      </div>
      <h2>use-undo 实现撤销/重做功能，同时保持与原生编辑体验的一致性</h2>
      <UndoableEditor spellcheck ref={undoableEditorRef} />
      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <button onClick={() => undoableEditorRef.current?.undo()}>
          撤销(Ctrl + Z)
        </button>
        <button onClick={() => undoableEditorRef.current?.redo()}>
          重做(Ctrl + Y)
        </button>
        <button
          onClick={() => {
            const state = undoableEditorRef.current?.getState();
            alert(JSON.stringify(state, null, 2));
          }}
        >
          获取状态
        </button>
      </div>
    </div>
  );
}

export default App;
