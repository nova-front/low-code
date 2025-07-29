# @nova-fe/base-ui

一个基于 React 的 Headless UI 组件库，专注于提供可深度定制的无样式设计系统。

## 🚀 项目特性

### 🎯 Headless UI 设计理念

- 完全无样式设计，不包含任何内联样式或默认CSS
- 用户可通过 `className` 属性完全控制组件样式
- 专注于功能逻辑，将样式控制权交给开发者

### 🔧 高度可定制

- 支持通过 `as` 属性渲染为不同的HTML元素
- 完整的TypeScript类型支持
- 兼容所有标准HTML属性

### ♿ 无障碍支持

- 完整的 a11y（可访问性）支持
- 禁用状态的正确处理
- 键盘导航和屏幕阅读器友好

## 📦 安装

```bash
npm install @nova-fe/base-ui
```

## 🛠️ 技术栈

- **核心框架**: React 18.2.0
- **开发语言**: TypeScript
- **构建工具**: Rollup 4
- **测试框架**: Jest + React Testing Library

## 📖 组件文档

### Button 组件

Button 是一个完全无样式的按钮组件，支持多种渲染方式和完整的无障碍功能。

#### 基本用法

```tsx
import { Button } from "@nova-fe/base-ui";

// 基本按钮
<Button onClick={() => alert("点击了按钮")}>基本按钮</Button>;
```

#### 禁用状态

```tsx
// 禁用按钮
<Button disabled>禁用按钮</Button>

// 带点击事件的禁用按钮（点击事件不会触发）
<Button disabled onClick={() => alert("你不会看到这个提示")}>
  带点击事件的禁用按钮
</Button>
```

#### 渲染为其他元素

```tsx
// 渲染为链接
<Button as="a" href="https://example.com" target="_blank">
  链接样式按钮
</Button>

// 渲染为div
<Button as="div" onClick={() => console.log("div按钮")}>
  Div按钮
</Button>
```

#### 自定义样式

```tsx
// 使用自定义类名
<Button
  className="custom-btn bg-blue-500 text-white px-4 py-2 rounded"
  onClick={() => console.log("自定义样式按钮")}
>
  自定义样式按钮
</Button>
```

#### API 参考

| 属性        | 类型                | 默认值     | 描述                 |
| ----------- | ------------------- | ---------- | -------------------- |
| `children`  | `React.ReactNode`   | -          | 按钮内容             |
| `className` | `string`            | `""`       | 自定义CSS类名        |
| `disabled`  | `boolean`           | `false`    | 是否禁用             |
| `as`        | `React.ElementType` | `"button"` | 渲染的HTML元素类型   |
| `onClick`   | `function`          | -          | 点击事件处理函数     |
| `...props`  | -                   | -          | 支持所有原生HTML属性 |

#### 样式类名

组件会自动添加以下CSS类名：

- `unstyled-button`: 基础类名
- `unstyled-button--disabled`: 禁用状态类名（当 `disabled=true` 时）
- 用户自定义的 `className`

## 🧪 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev  # 监听模式构建
```

### 构建项目

```bash
npm run build  # 生产构建
```

### 运行测试

```bash
npm test              # 运行所有测试
npm run test:watch    # 监听模式测试
npm run test:coverage # 测试覆盖率报告
```

### 发布前检查

```bash
npm run check:pre-publish  # 发布前自动检查
```

## 📦 发布指南

### 快速发布

```bash
# 补丁版本（bug 修复）
npm run release:patch

# 次要版本（新功能）
npm run release:minor

# 主要版本（破坏性更改）
npm run release:major

# 测试版本
npm run release:beta
```

### 详细文档

- [� 更新日志](./CHANGELOG.md) - 版本更新记录
- [� 发布指南](./PUBLISH.md) - npm发布流程

## 📁 项目结构

```
packages/base-ui/
├── src/
│   ├── button/           # Button组件
│   ├── utils/            # 工具函数库
│   └── index.ts          # 主入口文件
├── scripts/              # 发布脚本
├── dist/                 # 构建输出
├── README.md             # 项目文档
├── CHANGELOG.md          # 更新日志
├── PUBLISH.md            # 发布指南
└── package.json          # 项目配置
```

## 🎨 设计原则

### 1. 最小化原则

- 只提供核心功能，不包含任何样式
- 保持API简洁，避免过度抽象

### 2. 可扩展性

- 支持通过 `as` 属性扩展为任意元素
- 完整的属性透传机制

### 3. 类型安全

- 完整的TypeScript支持
- 严格的类型检查和推导

### 4. 无障碍优先

- 默认符合WCAG标准
- 自动处理可访问性属性

## 🚧 未来规划

基于当前的Button组件实现，项目将继续扩展更多组件：

- **Input**: 输入框组件
- **Select**: 选择器组件
- **Modal**: 模态框组件
- **Tooltip**: 提示框组件
- **Form**: 表单组件

每个组件都将遵循相同的Headless UI设计理念。

## 📄 许可证

ISC

## 👨‍💻 作者

Leslie

---

**@nova-fe/base-ui** - 让UI组件回归本质，专注功能，样式由你定义。
