import React, { useRef, useState } from 'react';
import {
  TextArea,
  TextAreaCore,
  TextAreaUndo,
  TextAreaUndoHandle,
} from '@nova-fe/editor';
import DemoSection from '../../components/DemoSection';

const BasicEditor: React.FC = () => {
  const undoableEditorRef = useRef<TextAreaUndoHandle>(null);
  const [controlledValue, setControlledValue] = useState<string>('');

  return (
    <div>
      <DemoSection
        title="📝 基础 TextArea（非受控）"
        description="最简单的 TextArea 使用方式，支持基本的文本编辑功能"
        code={`import { TextArea } from "@nova-fe/editor";

<TextArea placeholder="请输入内容..." />`}
      >
        <TextArea
          placeholder="请输入内容..."
          borderRadius="6px"
          minHeight="120px"
          border="1px solid #d9d9d9"
          padding="12px"
          onFocus={() => console.log('🔧 [BasicEditor] 非受控获得焦点')}
          onBlur={() => console.log('🔧 [BasicEditor] 非受控失去焦点')}
        />
      </DemoSection>

      <DemoSection
        title="🎛️ 受控 TextArea"
        description="通过 value 和 onChange 属性控制 TextArea 内容，实现双向数据绑定"
        code={`const [value, setValue] = useState("");

<TextArea
  value={value}
  onChange={setValue}
  placeholder="受控模式"
/>`}
      >
        <TextArea
          placeholder="受控模式"
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
        title="🎨 自定义样式 TextArea"
        description="通过样式属性自定义 TextArea 外观，支持丰富的样式配置"
        code={`<TextArea
  fontSize="18px"
  lineHeight={1.8}
  fontFamily="Georgia, serif"
  color="#2c3e50"
  backgroundColor="#fafafa"
  padding="16px"
  borderRadius="12px"
  minHeight="150px"
  border="2px solid #3498db"
  placeholder="自定义样式"
/>`}
      >
        <TextArea
          fontSize="18px"
          lineHeight={1.8}
          fontFamily="Georgia, serif"
          color="#2c3e50"
          backgroundColor="#fafafa"
          padding="16px"
          borderRadius="12px"
          minHeight="150px"
          border="2px solid #3498db"
          placeholder="自定义样式，试试输入一些文字..."
        />
      </DemoSection>

      <DemoSection
        title="🔧 核心 TextArea 组件"
        description="TextAreaCore 专注于文本编辑功能，不包含拼写检查，性能更优"
        code={`import { TextAreaCore } from "@nova-fe/editor";

<TextAreaCore
  placeholder="核心 TextArea 组件"
  fontSize="16px"
  minHeight="120px"
/>`}
      >
        <TextAreaCore
          placeholder="这是核心 TextArea 组件，专注于文本编辑，不包含拼写检查功能"
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
            <li>需要纯文本编辑时使用 TextAreaCore</li>
            <li>需要拼写检查时使用 TextArea</li>
            <li>需要撤销重做时使用 TextAreaUndo</li>
          </ul>
        </div>
      </DemoSection>

      <DemoSection
        title="↩️ 撤销重做 TextArea"
        description="TextAreaUndo 提供完整的撤销重做功能，支持键盘快捷键和手动触发"
        code={`import { TextAreaUndo, TextAreaUndoHandle } from "@nova-fe/editor";

const undoableEditorRef = useRef<TextAreaUndoHandle>(null);

<TextAreaUndo
  ref={undoableEditorRef}
  spellcheck
  placeholder="支持撤销重做"
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
        <TextAreaUndo
          ref={undoableEditorRef}
          spellcheck
          placeholder="支持撤销/重做的 TextArea，试试 Ctrl+Z 和 Ctrl+Y，或者点击上方按钮"
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
