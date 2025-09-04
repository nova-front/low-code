/**
 * 通用工具函数库
 * 提供组件开发中常用的工具函数
 */

/**
 * 合并类名的工具函数
 * @param classes - 类名数组
 * @returns 合并后的类名字符串
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 创建带前缀的类名
 * @param prefix - 类名前缀
 * @param className - 自定义类名
 * @param modifiers - 修饰符对象
 * @returns 完整的类名字符串
 */
export const createPrefixedClassName = (
  prefix: string,
  className?: string,
  modifiers?: Record<string, boolean>
): string => {
  const classes = [prefix, className];

  if (modifiers) {
    for (const modifier in modifiers) {
      if (modifiers[modifier]) {
        classes.push(`${prefix}--${modifier}`);
      }
    }
  }

  return cn(...classes);
};

/**
 * 检查是否为有效的React元素类型
 * @param element - 要检查的元素
 * @returns 是否为有效的元素类型
 */
export const isValidElementType = (
  element: any
): element is React.ElementType => {
  return (
    typeof element === 'string' ||
    typeof element === 'function' ||
    (typeof element === 'object' && element !== null)
  );
};

/**
 * 深度合并对象
 * @param target - 目标对象
 * @param sources - 源对象数组
 * @returns 合并后的对象
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = {} as any;
        }
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key] as any;
      }
    }
  }

  return deepMerge(target, ...sources);
};

/**
 * 检查是否为对象
 * @param item - 要检查的项目
 * @returns 是否为对象
 */
const isObject = (item: any): item is Record<string, any> => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * 防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait) as any;
  };
};

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param limit - 限制时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * 获取元素的可访问性属性
 * @param disabled - 是否禁用
 * @param role - 角色
 * @returns 可访问性属性对象
 */
export const getA11yProps = (
  disabled?: boolean,
  role?: string
): Record<string, any> => {
  const props: Record<string, any> = {};

  if (disabled) {
    props['aria-disabled'] = true;
    props.tabIndex = -1;
  }

  if (role) {
    props.role = role;
  }

  return props;
};

/**
 * 类型守卫：检查是否为函数
 * @param value - 要检查的值
 * @returns 是否为函数
 */
export const isFunction = (value: any): value is Function => {
  return typeof value === 'function';
};

/**
 * 类型守卫：检查是否为字符串
 * @param value - 要检查的值
 * @returns 是否为字符串
 */
export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

/**
 * 类型守卫：检查是否为数字
 * @param value - 要检查的值
 * @returns 是否为数字
 */
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * 安全地调用函数
 * @param fn - 要调用的函数
 * @param args - 函数参数
 * @returns 函数返回值或undefined
 */
export const safeCall = <T extends (...args: any[]) => any>(
  fn: T | undefined,
  ...args: Parameters<T>
): ReturnType<T> | undefined => {
  return isFunction(fn) ? fn(...args) : undefined;
};
