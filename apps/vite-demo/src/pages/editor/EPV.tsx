import React from "react";
import { ContentEditable } from "@nova-fe/editor";
import DemoSection from "../../components/DemoSection";

const EPV: React.FC = () => {
  return (
    <div>
      <DemoSection
        title="英语单词校验编辑器 (EPV)"
        description="专业的英语单词校验功能，适用于学术论文、文章校验，错误单词下方自动显示红色波浪线"
        code={`<ContentEditable
  style={{
    fontSize: "18px",
    lineHeight: 1.6,
    padding: "16px",
    minHeight: "400px",
    fontFamily: "Georgia, 'Times New Roman', serif"
  }}
  spellcheck
  placeholder="请输入或粘贴英文文本进行拼写检查..."
/>`}
      >
        <ContentEditable
          style={{
            fontSize: "18px",
            lineHeight: 1.6,
            padding: "16px",
            minHeight: "400px",
            width: "100%",
            borderRadius: "6px",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
          spellcheck
          placeholder="请输入或粘贴英文文本进行拼写检查..."
        />
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "#fff7e6",
            borderRadius: "4px",
            border: "1px solid #ffd591",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#fa8c16" }}>
            💡 <strong>使用提示：</strong>
            输入英文文本，拼写错误的单词会自动显示红色波浪下划线。
            适合学术论文、英文文章的拼写检查和校对工作。
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="学术论文模式"
        description="专为学术写作优化的编辑器，使用更大的编辑区域和学术字体"
        code={`<ContentEditable
  style={{
    fontSize: "16px",
    lineHeight: 1.8,
    padding: "24px",
    minHeight: "500px",
    fontFamily: "Times, 'Times New Roman', serif"
  }}
  spellcheck
  placeholder="请输入学术论文内容..."
/>`}
      >
        <ContentEditable
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            padding: "24px",
            minHeight: "500px",
            width: "100%",
            border: "2px solid #e8e8e8",
            borderRadius: "8px",
            fontFamily: "Times, 'Times New Roman', serif",
            backgroundColor: "#fafafa",
          }}
          spellcheck
          placeholder="请输入学术论文内容..."
        />
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f0f5ff",
            borderRadius: "6px",
            border: "1px solid #adc6ff",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#1677ff" }}>
            📚 学术写作建议
          </h4>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#666" }}>
            <li>使用正式的学术语言和术语</li>
            <li>注意语法和拼写的准确性</li>
            <li>保持段落结构清晰</li>
            <li>引用格式要规范</li>
          </ul>
        </div>
      </DemoSection>

      <DemoSection
        title="多语言支持"
        description="支持多种语言的拼写检查，可以根据内容自动识别语言"
      >
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <h4 style={{ marginBottom: "0.5rem", color: "#333" }}>英文文本</h4>
            <ContentEditable
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                padding: "12px",
                minHeight: "120px",
                width: "100%",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontFamily: "Arial, sans-serif",
              }}
              spellcheck
              placeholder="Type English text here..."
            />
          </div>

          <div>
            <h4 style={{ marginBottom: "0.5rem", color: "#333" }}>
              中英混合文本
            </h4>
            <ContentEditable
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                padding: "12px",
                minHeight: "120px",
                width: "100%",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontFamily: "Arial, sans-serif",
              }}
              spellcheck
              placeholder="可以输入中英文混合内容 mixed with English text..."
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "#f6ffed",
            borderRadius: "4px",
            border: "1px solid #b7eb8f",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#52c41a" }}>
            ✅ <strong>多语言特性：</strong>
            浏览器会根据文本内容自动识别语言并进行相应的拼写检查。
            支持英文、中文、以及其他主流语言的混合输入。
          </p>
        </div>
      </DemoSection>
    </div>
  );
};

export default EPV;
