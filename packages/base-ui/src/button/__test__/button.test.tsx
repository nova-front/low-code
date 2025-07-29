import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "..";

describe("Button Component", () => {
  // 测试 1: 默认渲染为按钮元素
  it("renders as a button element by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // 测试 2: 支持作为链接渲染
  it('renders as an anchor element when "as" prop is "a"', () => {
    render(
      <Button as="a" href="https://example.com">
        Link
      </Button>
    );

    // 现在应使用 link 角色查找
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    // 确保没有错误分配 button 角色
    expect(link).not.toHaveAttribute("role", "button");
  });

  // 测试 3: 正确合并自定义类名
  it("combines custom class names", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("unstyled-button");
    expect(button).toHaveClass("custom-class");
  });

  // 测试 4: 正确处理禁用状态（按钮）
  it("handles disabled state for buttons correctly", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("unstyled-button--disabled");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 测试 5: 正确处理禁用状态（链接）
  it("handles disabled state for anchors correctly", () => {
    const handleClick = jest.fn();
    render(
      <Button as="a" href="#" disabled onClick={handleClick}>
        Disabled Link
      </Button>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabIndex", "-1");
    expect(link).toHaveClass("unstyled-button--disabled");

    fireEvent.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 测试 6: 阻止默认行为
  it("prevents default when disabled anchor is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button as="a" href="#" disabled onClick={handleClick}>
        Disabled Link
      </Button>
    );

    const link = screen.getByRole("link");
    const clickEvent = new MouseEvent("click", { bubbles: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");

    fireEvent(link, clickEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  // 测试 7: 正常触发点击事件
  it("triggers click handler when enabled", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Enabled</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 测试 8: 非按钮元素分配 button 角色
  it("adds role=button to non-button elements", () => {
    render(<Button as="div">Div Button</Button>);
    const divButton = screen.getByRole("button");
    expect(divButton).toBeInTheDocument();
    expect(divButton.tagName).toBe("DIV");
    expect(divButton).toHaveAttribute("role", "button");
  });

  // 测试 9: 键盘事件支持
  it("supports keyboard events for non-button elements", () => {
    const handleClick = jest.fn();
    render(
      <Button as="div" onClick={handleClick}>
        Div Button
      </Button>
    );

    const divButton = screen.getByRole("button");

    // 测试 Enter 键
    fireEvent.keyDown(divButton, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // 测试 Space 键
    fireEvent.keyDown(divButton, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);

    // 测试其他键不触发点击
    fireEvent.keyDown(divButton, { key: "Escape" });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // 测试 10: 禁用状态下键盘事件不触发
  it("does not trigger keyboard events when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button as="div" disabled onClick={handleClick}>
        Disabled Div
      </Button>
    );

    const divButton = screen.getByRole("button");

    fireEvent.keyDown(divButton, { key: "Enter" });
    fireEvent.keyDown(divButton, { key: " " });

    expect(handleClick).not.toHaveBeenCalled();
  });

  // 测试 11: 默认按钮类型为 button
  it('defaults to type="button" for buttons', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  // 测试 12: 支持自定义按钮类型
  it("supports custom button types", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  // 测试 13: 非按钮元素没有 type 属性
  it("does not add type attribute to non-button elements", () => {
    // 测试 div 元素
    render(<Button as="div">Div Button</Button>);
    const div = screen.getByRole("button");
    expect(div).not.toHaveAttribute("type");

    // 测试 a 元素
    render(
      <Button as="a" href="#">
        Link
      </Button>
    );
    const link = screen.getByText("Link");
    expect(link).not.toHaveAttribute("type");
  });

  // 测试 14: 禁用链接是否包含正确的属性
  it("disabled link has correct accessibility attributes", () => {
    render(
      <Button as="a" href="#" disabled>
        Disabled Link
      </Button>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabIndex", "-1");
    expect(link).toHaveClass("unstyled-button--disabled");
    // 确保默认角色没有被覆盖
    expect(link).not.toHaveAttribute("role");
  });

  // 测试 15: 事件传播控制（非按钮元素）
  it("stops event propagation when disabled for non-button elements", () => {
    const parentClick = jest.fn();
    const buttonClick = jest.fn();

    render(
      <div onClick={parentClick}>
        <Button as="div" disabled onClick={buttonClick}>
          Disabled Div Button
        </Button>
      </div>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(buttonClick).not.toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled(); // 事件被阻止传播
  });

  // 测试 16: 自定义 onKeyDown 处理器
  it("calls custom onKeyDown handler", () => {
    const handleKeyDown = jest.fn();
    render(
      <Button as="div" onKeyDown={handleKeyDown}>
        Div Button
      </Button>
    );

    const divButton = screen.getByRole("button");
    fireEvent.keyDown(divButton, { key: "Tab" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  // 测试 17: 边界情况 - 空类名
  it("handles empty className correctly", () => {
    render(<Button className="">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("unstyled-button");
    expect(button.className).toBe("unstyled-button");
  });

  // 测试 18: 边界情况 - undefined children
  it("handles undefined children", () => {
    render(<Button>{undefined}</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("");
  });
});
