import React, { useState } from "react";
import { Button } from "@nova-fe/base-ui";
import DemoSection from "../../components/DemoSection";

const BaseUI: React.FC = () => {
  document.title = "Base UI - Headless UI 组件库";

  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleBasicClick = () => {
    setClickCount((prev) => prev + 1);
    setMessage(`按钮被点击了 ${clickCount + 1} 次`);
  };

  const handleAsyncClick = async () => {
    setMessage("处理中...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessage("异步操作完成！");
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Base UI 组件库</h1>
        <p className="page-description">
          Headless UI
          设计理念的无样式按钮组件。提供完整的功能逻辑，样式完全由开发者控制。
          支持多种HTML元素渲染、完整的无障碍功能、TypeScript类型支持。
        </p>
      </div>

      <DemoSection
        title="基本按钮"
        description="最基础的按钮用法，展示点击事件处理"
        code={`<Button onClick={() => alert("点击了按钮")}>
  基本按钮
</Button>`}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button className="btn btn-primary" onClick={handleBasicClick}>
            点击计数按钮
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => alert("Hello from Base UI!")}
          >
            弹窗按钮
          </Button>
          <Button className="btn btn-secondary" onClick={handleAsyncClick}>
            异步操作
          </Button>
        </div>
        {message && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              background: "#f0f5ff",
              borderRadius: "4px",
            }}
          >
            📝 {message}
          </div>
        )}
      </DemoSection>

      <DemoSection
        title="禁用状态"
        description="展示按钮的禁用状态，禁用时点击事件不会触发"
        code={`<Button disabled>禁用按钮</Button>
<Button disabled onClick={() => alert("不会触发")}>
  带事件的禁用按钮
</Button>`}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button className="btn btn-primary" disabled>
            禁用的主要按钮
          </Button>
          <Button className="btn btn-secondary" disabled>
            禁用的次要按钮
          </Button>
          <Button
            className="btn btn-danger"
            disabled
            onClick={() => alert("你不会看到这个提示")}
          >
            禁用的危险按钮
          </Button>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          💡 禁用状态下，按钮会自动添加{" "}
          <code className="code-highlight">unstyled-button--disabled</code> 类名
        </p>
      </DemoSection>

      <DemoSection
        title="渲染为不同元素"
        description="使用 as 属性可以将按钮渲染为不同的HTML元素"
        code={`<Button as="a" href="https://example.com" target="_blank">
  链接样式按钮
</Button>
<Button as="div" onClick={() => console.log("div按钮")}>
  Div按钮
</Button>`}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            as="a"
            href="https://github.com"
            target="_blank"
            className="btn btn-link"
          >
            GitHub 链接 🔗
          </Button>
          <Button
            as="div"
            className="btn btn-secondary"
            onClick={() => console.log("这是一个div元素")}
          >
            Div 按钮
          </Button>
          <Button
            as="span"
            className="btn btn-secondary"
            onClick={() => console.log("这是一个span元素")}
          >
            Span 按钮
          </Button>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          💡 非按钮元素会自动添加{" "}
          <code className="code-highlight">role="button"</code> 和键盘事件支持
        </p>
      </DemoSection>

      <DemoSection
        title="自定义样式"
        description="通过 className 属性添加自定义样式，展示 Headless UI 的灵活性"
        code={`<Button className="custom-btn">
  自定义样式按钮
</Button>

/* CSS */
.custom-btn {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  transition: transform 0.2s;
}
.custom-btn:hover {
  transform: scale(1.05);
}`}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            className="btn btn-primary"
            style={{ borderRadius: "20px" }}
            onClick={() => console.log("圆角按钮")}
          >
            圆角按钮
          </Button>
          <Button
            className="btn"
            style={{
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "25px",
              fontWeight: "bold",
            }}
            onClick={() => console.log("渐变按钮")}
          >
            渐变按钮
          </Button>
          <Button
            className="btn"
            style={{
              background: "transparent",
              border: "2px dashed #1677ff",
              color: "#1677ff",
              padding: "0.5rem 1rem",
            }}
            onClick={() => console.log("虚线边框按钮")}
          >
            虚线边框
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="键盘事件支持"
        description="非按钮元素支持 Enter 和 Space 键触发点击事件"
        code={`<Button as="div" onKeyDown={handleKeyDown}>
  支持键盘事件的Div
</Button>`}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            as="div"
            className="btn btn-secondary"
            onClick={() => setMessage("Div按钮被点击！")}
            style={{ cursor: "pointer" }}
          >
            试试按 Enter 或 Space 键
          </Button>
          <Button
            as="span"
            className="btn btn-secondary"
            onClick={() => setMessage("Span按钮被点击！")}
            style={{ cursor: "pointer" }}
          >
            Span 元素也支持键盘事件
          </Button>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          💡 聚焦到按钮后，按 Enter 或 Space 键试试
        </p>
      </DemoSection>

      <div className="demo-section">
        <h3 className="demo-title">组件特性总结</h3>
        <div className="demo-grid">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">🎨 Headless UI</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: "1.2rem", color: "#666" }}>
                <li>完全无样式设计</li>
                <li>通过 className 完全控制样式</li>
                <li>专注于功能逻辑</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">🔧 高度可定制</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: "1.2rem", color: "#666" }}>
                <li>支持 as 属性渲染不同元素</li>
                <li>完整的 TypeScript 类型支持</li>
                <li>兼容所有标准 HTML 属性</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">♿ 无障碍支持</h4>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: "1.2rem", color: "#666" }}>
                <li>完整的 a11y 支持</li>
                <li>自动处理 ARIA 属性</li>
                <li>键盘导航支持</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseUI;
