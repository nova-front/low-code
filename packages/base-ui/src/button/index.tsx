import React, {
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

// 按钮类型定义
type BaseButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  as?: React.ElementType;
};

// 合并原生按钮属性
type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    children,
    className = "",
    disabled = false,
    as: Element = "button",
    ...restProps
  } = props;

  const buttonClasses = [
    "unstyled-button",
    className,
    disabled ? "unstyled-button--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // 角色处理逻辑优化
  const elementProps: Record<string, any> = {};
  if (Element === "button") {
    elementProps.type =
      (restProps as ButtonHTMLAttributes<HTMLButtonElement>).type || "button";
    elementProps.disabled = disabled;
  } else {
    // 对于非按钮元素，默认添加 role="button"
    elementProps.role = "button";

    if (disabled) {
      elementProps.tabIndex = -1;
      elementProps["aria-disabled"] = true;
    }
  }

  // 过滤掉非按钮元素的 type 属性
  const filteredProps = { ...restProps };
  if (Element !== "button") {
    delete (filteredProps as any).type;

    // 特殊处理：如果是链接元素，需要移除 role
    if (Element === "a") {
      delete elementProps.role;
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (restProps.onClick) {
      restProps.onClick(event as any);
    }
  };

  return (
    <Element
      {...filteredProps}
      ref={ref as any}
      className={buttonClasses}
      onClick={handleClick}
      {...elementProps}
    >
      {children}
    </Element>
  );
});

Button.displayName = "UnstyledButton";
