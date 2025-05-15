import { useRef, useState } from "react";
import {
  ContentEditable,
  UndoableEditor,
  UndoableEditorHandle,
} from "@repo/editor";
import DemoBox from "../../components/demo";

function App() {
  document.title = "Editor编辑器演示";

  const undoableEditorRef = useRef<UndoableEditorHandle>(null);
  const [value, setValue] = useState<any>("abc");
  return (
    <div>
      <DemoBox title="DOM + ContentEditable 实现 TextArea 基础功能(非受控)">
        <ContentEditable placeholder="请输入" />
      </DemoBox>
      <DemoBox title="TextArea 基础(受控)">
        <ContentEditable
          placeholder="请输入"
          value={value}
          onChange={setValue}
        />
      </DemoBox>
      <DemoBox title="24px蓝色字体, 行高 1.6, 内边距 12px, 开启 spellcheck">
        <ContentEditable
          style={{
            fontSize: "24px",
            lineHeight: 1.6,
            color: "blue",
            padding: "12px",
          }}
          spellcheck
          placeholder="请输入"
        />
      </DemoBox>
      <DemoBox title="use-undo 实现撤销/重做功能，同时保持与原生编辑体验的一致性">
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
      </DemoBox>
    </div>
  );
}

export default App;
