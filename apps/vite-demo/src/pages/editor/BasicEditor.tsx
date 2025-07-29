import React, { useRef, useState } from "react";
import {
  ContentEditable,
  UndoableEditor,
  UndoableEditorHandle,
} from "@nova-fe/editor";
import DemoSection from "../../components/DemoSection";

const BasicEditor: React.FC = () => {
  const undoableEditorRef = useRef<UndoableEditorHandle>(null);
  const [value, setValue] = useState<string>("abc");

  return (
    <div>
      <DemoSection
        title="基础编辑器 (非受控)"
        description="使用 DOM + ContentEditable 实现的基础文本编辑功能"
        code={`<ContentEditable placeholder="请输入" />`}
      >
        <ContentEditable
          placeholder="请输入内容..."
          style={{
            borderRadius: "6px",
            padding: "8px 12px",
            minHeight: "100px",
            width: "100%",
          }}
        />
      </DemoSection>

      <DemoSection
        title="受控编辑器"
        description="支持 value 和 onChange 的受控组件模式"
        code={`const [value, setValue] = useState("abc");

<ContentEditable
  placeholder="请输入"
  value={value}
  onChange={setValue}
/>`}
      >
        <ContentEditable
          placeholder="请输入内容..."
          value={value}
          onChange={setValue}
          style={{
            borderRadius: "6px",
            padding: "8px 12px",
            minHeight: "100px",
            width: "100%",
          }}
        />
        <div
          style={{
            marginTop: "1rem",
            padding: "0.5rem",
            background: "#f6f8fa",
            borderRadius: "4px",
          }}
        >
          <strong>当前值:</strong> {JSON.stringify(value)}
        </div>
      </DemoSection>

      <DemoSection
        title="自定义样式编辑器"
        description="24px蓝色字体, 行高 1.6, 内边距 12px, 开启拼写检查"
        code={`<ContentEditable
  style={{
    fontSize: "24px",
    lineHeight: 1.6,
    color: "blue",
    padding: "12px",
  }}
  spellcheck
  placeholder="请输入"
/>`}
      >
        <ContentEditable
          style={{
            fontSize: "24px",
            lineHeight: 1.6,
            color: "blue",
            padding: "12px",
            borderRadius: "8px",
            minHeight: "120px",
            width: "100%",
          }}
          spellcheck
          placeholder="请输入内容..."
        />
      </DemoSection>

      <DemoSection
        title="撤销/重做编辑器"
        description="使用 use-undo 实现撤销/重做功能，同时保持与原生编辑体验的一致性"
        code={`const undoableEditorRef = useRef<UndoableEditorHandle>(null);

<UndoableEditor spellcheck ref={undoableEditorRef} />

// 撤销
undoableEditorRef.current?.undo();
// 重做  
undoableEditorRef.current?.redo();
// 获取状态
undoableEditorRef.current?.getState();`}
      >
        <UndoableEditor
          spellcheck
          ref={undoableEditorRef}
          style={{
            borderRadius: "6px",
            padding: "8px 12px",
            minHeight: "120px",
            width: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => undoableEditorRef.current?.undo()}
          >
            ↶ 撤销 (Ctrl + Z)
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => undoableEditorRef.current?.redo()}
          >
            ↷ 重做 (Ctrl + Y)
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              const state = undoableEditorRef.current?.getState();
              alert(JSON.stringify(state, null, 2));
            }}
          >
            📄 获取状态
          </button>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          💡 支持键盘快捷键：Ctrl+Z (撤销)、Ctrl+Y (重做)
        </p>
      </DemoSection>
    </div>
  );
};

export default BasicEditor;
