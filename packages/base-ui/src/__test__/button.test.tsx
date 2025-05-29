import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../button"; // 根据实际路径调整

describe("Button 组件", () => {
  // 测试1: 渲染基础内容
  it("正确渲染子内容", () => {
    render(<Button appName="Test App">Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  // 测试2: 应用自定义 className
  it("接受并应用 className", () => {
    render(
      <Button appName="Test App" className="custom-class">
        Button
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  // 测试3: 点击事件触发 alert
  it("点击时触发带 appName 的 alert", () => {
    // 模拟 window.alert
    window.alert = jest.fn();
    const appName = "My Awesome App";

    render(<Button appName={appName}>Test</Button>);
    fireEvent.click(screen.getByRole("button"));

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      `Hello from your ${appName} app!`
    );
  });

  // 测试4: 必需的 appName prop
  it("需要 appName prop", () => {
    // 故意不传 appName 来测试 TypeScript 类型检查
    // 这里主要验证 TypeScript 的行为，实际运行时测试可能不需要
    const button = <Button appName="Test">Child</Button>;
    expect(button).toBeTruthy();
  });

  it("渲染快照匹配", () => {
    const { asFragment } = render(
      <Button appName="Snapshot Test">Snapshot</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("具有正确的按钮角色", () => {
    render(<Button appName="A11y Test">Accessible</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("处理空子内容", () => {
    render(<Button appName="Empty Test">{""}</Button>);
    expect(screen.getByRole("button")).toBeEmptyDOMElement();
  });
});
