import React, { useRef, useState } from 'react';
import {
  ContentEditable,
  ContentEditableCore,
  UndoableEditor,
  UndoableEditorHandle,
} from '@nova-fe/editor';
import DemoSection from '../../components/DemoSection';

const BasicEditor: React.FC = () => {
  const undoableEditorRef = useRef<UndoableEditorHandle>(null);
  const [controlledValue, setControlledValue] = useState<string>('');

  return (
    <div>
      <DemoSection
        title="📝 基础编辑器（非受控）"
        description="最简单的编辑器使用方式，支持基本的文本编辑功能"
        code={`import { ContentEditable } from "@nova-fe/editor";

<ContentEditable placeholder="请输入内容..." />`}
      >
        <ContentEditable
          placeholder="请输入内容..."
          borderRadius="6px"
          minHeight="120px"
          border="1px solid #d9d9d9"
          padding="12px"
          onFocus={() => console.log('🔧 [BasicEditor] 非受控编辑器获得焦点')}
          onBlur={() => console.log('🔧 [BasicEditor] 非受控编辑器失去焦点')}
        />
      </DemoSection>

      <DemoSection
        title="🎛️ 受控编辑器"
        description="通过 value 和 onChange 属性控制编辑器内容，实现双向数据绑定"
        code={`const [value, setValue] = useState("");

<ContentEditable
  value={value}
  onChange={setValue}
  placeholder="受控模式编辑器"
/>`}
      >
        <ContentEditable
          placeholder="受控模式编辑器"
          value={controlledValue}
          onChange={setControlledValue}
          borderRadius="6px"
          padding="12px"
          minHeight="120px"
          border="1px solid #1677ff"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f0f5ff',
            borderRadius: '6px',
            border: '1px solid #adc6ff',
          }}
        >
          <strong>当前内容：</strong> {controlledValue || '（空）'}
          <br />
          <strong>字符数：</strong> {controlledValue.length}
        </div>
      </DemoSection>

      <DemoSection
        title="🎨 自定义样式编辑器"
        description="通过样式属性自定义编辑器外观，支持丰富的样式配置"
        code={`<ContentEditable
  fontSize="18px"
  lineHeight={1.8}
  fontFamily="Georgia, serif"
  color="#2c3e50"
  backgroundColor="#fafafa"
  padding="16px"
  borderRadius="12px"
  minHeight="150px"
  border="2px solid #3498db"
  placeholder="自定义样式编辑器"
/>`}
      >
        <ContentEditable
          fontSize="18px"
          lineHeight={1.8}
          fontFamily="Georgia, serif"
          color="#2c3e50"
          backgroundColor="#fafafa"
          padding="16px"
          borderRadius="12px"
          minHeight="150px"
          border="2px solid #3498db"
          placeholder="自定义样式编辑器，试试输入一些文字..."
        />
      </DemoSection>

      <DemoSection
        title="🔧 核心编辑器组件"
        description="ContentEditableCore 专注于文本编辑功能，不包含拼写检查，性能更优"
        code={`import { ContentEditableCore } from "@nova-fe/editor";

<ContentEditableCore
  placeholder="核心编辑器组件"
  fontSize="16px"
  minHeight="120px"
/>`}
      >
        <ContentEditableCore
          placeholder="这是核心编辑器组件，专注于文本编辑，不包含拼写检查功能"
          fontSize="16px"
          lineHeight={1.6}
          padding="12px"
          minHeight="120px"
          border="1px solid #52c41a"
          borderRadius="6px"
          backgroundColor="#f6ffed"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bae7ff',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1677ff' }}>
            💡 使用建议
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#666' }}>
            <li>需要纯文本编辑时使用 ContentEditableCore</li>
            <li>需要拼写检查时使用 ContentEditable</li>
            <li>需要撤销重做时使用 UndoableEditor</li>
          </ul>
        </div>
      </DemoSection>

      <DemoSection
        title="↩️ 撤销重做编辑器"
        description="UndoableEditor 提供完整的撤销重做功能，支持键盘快捷键和手动触发"
        code={`import { UndoableEditor, UndoableEditorHandle } from "@nova-fe/editor";

const undoableEditorRef = useRef<UndoableEditorHandle>(null);

<UndoableEditor
  ref={undoableEditorRef}
  spellcheck
  placeholder="支持撤销重做的编辑器"
/>

// 手动触发撤销/重做
undoableEditorRef.current?.undo();
undoableEditorRef.current?.redo();`}
      >
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => undoableEditorRef.current?.undo()}
            style={{
              marginRight: '0.5rem',
              padding: '8px 16px',
              backgroundColor: '#1677ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ↶ 撤销 (Ctrl+Z)
          </button>
          <button
            onClick={() => undoableEditorRef.current?.redo()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ↷ 重做 (Ctrl+Y)
          </button>
          <button
            onClick={() => {
              const state = undoableEditorRef.current?.getState();
              alert(JSON.stringify(state, null, 2));
            }}
            style={{
              marginLeft: '0.5rem',
              padding: '8px 16px',
              backgroundColor: '#722ed1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📄 获取状态
          </button>
        </div>
        <UndoableEditor
          ref={undoableEditorRef}
          spellcheck
          placeholder="支持撤销/重做的编辑器，试试 Ctrl+Z 和 Ctrl+Y，或者点击上方按钮"
          minHeight="150px"
          border="1px solid #722ed1"
          borderRadius="6px"
          padding="12px"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f9f0ff',
            borderRadius: '6px',
            border: '1px solid #d3adf7',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#722ed1' }}>
            ⌨️ 快捷键
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#666' }}>
            <li>
              <strong>Ctrl+Z</strong> (Windows) / <strong>Cmd+Z</strong> (Mac):
              撤销
            </li>
            <li>
              <strong>Ctrl+Y</strong> (Windows) / <strong>Cmd+Shift+Z</strong>{' '}
              (Mac): 重做
            </li>
          </ul>
        </div>
      </DemoSection>
    </div>
  );
};

export default BasicEditor;
