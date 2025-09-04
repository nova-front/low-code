import React, {
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  useMemo,
  useCallback,
} from 'react';
import { createPrefixedClassName, getA11yProps } from '../utils';

// 基础按钮属性定义
interface BaseButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  as?: React.ElementType;
}

// 简化的按钮属性类型
type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

// 工具函数：获取元素属性
const getElementProps = (
  element: React.ElementType,
  disabled: boolean,
  restProps: Record<string, any>
): Record<string, any> => {
  const elementProps: Record<string, any> = {};

  if (element === 'button') {
    elementProps.type = restProps.type || 'button';
    elementProps.disabled = disabled;
  } else {
    // 对于非按钮元素，使用工具函数获取可访问性属性
    const a11yProps = getA11yProps(disabled, 'button');
    // 使用展开运算符代替 Object.assign
    Object.keys(a11yProps).forEach((key) => {
      elementProps[key] = a11yProps[key];
    });

    // 特殊处理：如果是链接元素，需要移除 role
    if (element === 'a') {
      delete elementProps.role;
    }
  }

  return elementProps;
};

// 工具函数：过滤属性
const filterProps = (
  element: React.ElementType,
  props: Record<string, any>
): Record<string, any> => {
  const filteredProps = { ...props };

  if (element !== 'button') {
    delete filteredProps.type;
  }

  return filteredProps;
};

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    children,
    className = '',
    disabled = false,
    as: Element = 'button',
    onClick,
    ...restProps
  } = props;

  // 使用 useMemo 优化类名计算
  const buttonClasses = useMemo(
    () => createPrefixedClassName('unstyled-button', className, { disabled }),
    [className, disabled]
  );

  // 使用 useMemo 优化元素属性计算
  const elementProps = useMemo(
    () => getElementProps(Element, disabled, restProps),
    [Element, disabled, restProps]
  );

  // 使用 useMemo 优化属性过滤
  const filteredProps = useMemo(
    () => filterProps(Element, restProps),
    [Element, restProps]
  );

  // 使用 useCallback 优化点击事件处理
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      // 使用类型断言来处理事件类型
      if (onClick) {
        onClick(event as any);
      }
    },
    [disabled, onClick]
  );

  // 使用 useCallback 优化键盘事件处理
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      // 对于非按钮元素，支持 Enter 和 Space 键触发点击
      if (
        Element !== 'button' &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        handleClick(event as any);
      }

      // 调用原始的 onKeyDown 处理器
      if (restProps.onKeyDown) {
        (restProps.onKeyDown as any)(event);
      }
    },
    [disabled, Element, handleClick, restProps.onKeyDown]
  );

  return (
    <Element
      {...filteredProps}
      ref={ref}
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...elementProps}
    >
      {children}
    </Element>
  );
});

Button.displayName = 'UnstyledButton';
