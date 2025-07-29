# @nova-fe/color

一个专业的颜色系统库，提供完整的设计系统色彩解决方案，支持明暗主题自动切换。

## 🎨 项目特性

### 🌈 丰富的色彩体系

- **13种预设颜色**：red、volcano、orange、gold、yellow、lime、green、cyan、blue、geekblue、purple、magenta、grey
- **10级色阶**：每种颜色提供从浅到深的10个色阶
- **科学的色彩算法**：基于HSV色彩空间的智能色彩生成

### 🌓 主题支持

- **明亮主题**：适合日间使用的高对比度配色
- **暗黑主题**：适合夜间使用的低对比度配色
- **自动切换**：支持系统主题偏好自动切换

### 🔧 开发友好

- **CSS变量**：所有颜色以CSS自定义属性形式提供
- **TypeScript支持**：完整的类型定义和智能提示
- **原子化CSS**：可与任何CSS框架配合使用

## 📦 安装

```bash
npm install @nova-fe/color
```

## 🚀 快速开始

### 1. 引入CSS变量

```html
<!-- 在HTML中引入主题CSS -->
<link
  rel="stylesheet"
  href="node_modules/@nova-fe/color/dist/system/theme.css"
/>
```

或在CSS/SCSS中导入：

```css
@import "@nova-fe/color/dist/system/theme.css";
```

### 2. 使用颜色变量

```css
/* 使用预定义的颜色变量 */
.primary-button {
  background-color: var(--blue-6);
  color: white;
}

.danger-text {
  color: var(--red-6);
}

.success-badge {
  background-color: var(--green-1);
  color: var(--green-7);
}
```

### 3. JavaScript中使用

```typescript
import {
  lightThemeVariables,
  darkThemeVariables,
} from "@nova-fe/color/dist/system/theme-variables";

// 获取颜色值
const primaryColor = lightThemeVariables["--blue-6"]; // #1677FF
const dangerColor = lightThemeVariables["--red-6"]; // #F5222D
```

## 🎨 颜色体系

### 色彩分级

每种颜色都提供10个色阶，其中第6级为主色调：

- **1-5级**：由浅到深的浅色系
- **6级**：主色调（primary）
- **7-10级**：由浅到深的深色系

### 预设颜色

| 颜色名称   | 主色调  | 描述           |
| ---------- | ------- | -------------- |
| `red`      | #F5222D | 错误、危险状态 |
| `volcano`  | #FA541C | 警告、注意状态 |
| `orange`   | #FA8C16 | 活跃、热情     |
| `gold`     | #FAAD14 | 重要、突出     |
| `yellow`   | #FADB14 | 提醒、明亮     |
| `lime`     | #A0D911 | 新鲜、自然     |
| `green`    | #52C41A | 成功、安全     |
| `cyan`     | #13C2C2 | 清新、科技     |
| `blue`     | #1677FF | 主要、信息     |
| `geekblue` | #2F54EB | 专业、技术     |
| `purple`   | #722ED1 | 神秘、高贵     |
| `magenta`  | #EB2F96 | 活力、创意     |
| `grey`     | #666666 | 中性、辅助     |

### 颜色示例

#### Blue 色系

```css
--blue-1: #e6f4ff; /* 最浅 */
--blue-2: #bae0ff;
--blue-3: #91caff;
--blue-4: #69b1ff;
--blue-5: #4096ff;
--blue-6: #1677ff; /* 主色调 */
--blue-7: #0958d9;
--blue-8: #003eb3;
--blue-9: #002c8c;
--blue-10: #001d66; /* 最深 */
```

#### Red 色系

```css
--red-1: #fff1f0; /* 最浅 */
--red-2: #ffccc7;
--red-3: #ffa39e;
--red-4: #ff7875;
--red-5: #ff4d4f;
--red-6: #f5222d; /* 主色调 */
--red-7: #cf1322;
--red-8: #a8071a;
--red-9: #820014;
--red-10: #5c0011; /* 最深 */
```

## 🌓 主题切换

### 自动主题切换

CSS文件已内置媒体查询，会根据系统主题偏好自动切换：

```css
:root {
  /* 明亮主题颜色 */
  --blue-6: #1677ff;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* 暗黑主题颜色 */
    --blue-6: #1668dc;
  }
}
```

### 手动主题切换

```javascript
// 切换到暗黑主题
document.documentElement.setAttribute("data-theme", "dark");

// 切换到明亮主题
document.documentElement.setAttribute("data-theme", "light");

// 跟随系统主题
document.documentElement.removeAttribute("data-theme");
```

## 🛠️ 开发指南

### 项目结构

```
packages/color/
├── src/
│   ├── palette.ts        # 色彩调色板定义
│   └── utils.ts          # 颜色生成工具函数
├── scripts/
│   └── system.ts         # 构建脚本
├── dist/
│   └── system/
│       ├── theme.css     # 生成的CSS变量
│       └── theme-variables.ts # TypeScript变量定义
└── package.json
```

### 构建命令

```bash
# 清理并重新构建
npm run build

# 仅清理
npm run clean
```

### 自定义颜色

如果需要自定义颜色，可以修改 `src/palette.ts` 中的 `PRESET_SYSTEM_COLORS`：

```typescript
const PRESET_SYSTEM_COLORS = {
  // 添加自定义颜色
  brand: "#1890ff",
  secondary: "#722ed1",
  // ... 其他颜色
} as const;
```

然后运行构建命令重新生成CSS和TypeScript文件。

## 🎯 使用场景

### 1. 设计系统

```css
/* 按钮组件 */
.btn-primary {
  background-color: var(--blue-6);
  border-color: var(--blue-6);
  color: white;
}

.btn-primary:hover {
  background-color: var(--blue-7);
  border-color: var(--blue-7);
}

.btn-danger {
  background-color: var(--red-6);
  border-color: var(--red-6);
  color: white;
}
```

### 2. 状态指示

```css
/* 状态标签 */
.status-success {
  background-color: var(--green-1);
  color: var(--green-7);
  border: 1px solid var(--green-3);
}

.status-warning {
  background-color: var(--orange-1);
  color: var(--orange-7);
  border: 1px solid var(--orange-3);
}

.status-error {
  background-color: var(--red-1);
  color: var(--red-7);
  border: 1px solid var(--red-3);
}
```

### 3. 数据可视化

```css
/* 图表颜色 */
.chart-series-1 {
  color: var(--blue-6);
}
.chart-series-2 {
  color: var(--green-6);
}
.chart-series-3 {
  color: var(--orange-6);
}
.chart-series-4 {
  color: var(--purple-6);
}
.chart-series-5 {
  color: var(--cyan-6);
}
```

## 🔧 技术实现

### 颜色生成算法

本项目使用基于HSV色彩空间的科学算法生成色阶：

- **色相(H)**：根据基础色相进行微调
- **饱和度(S)**：浅色降低饱和度，深色适当增加
- **明度(V)**：浅色增加明度，深色降低明度

### 暗黑主题算法

暗黑主题通过混合算法实现：

```typescript
// 将明亮主题颜色与暗色背景混合
const darkColor = mix(backgroundColor, lightColor, opacity);
```

### 依赖库

- **@ctrl/tinycolor**: 颜色处理和转换
- **sass**: CSS预处理和压缩
- **fs-extra**: 文件系统操作
- **typescript**: 类型支持

## 📈 性能特点

- **体积小巧**: 生成的CSS文件仅约8KB
- **无运行时**: 纯CSS变量，无JavaScript运行时开销
- **缓存友好**: 静态文件，可充分利用浏览器缓存
- **按需使用**: 可选择性使用特定颜色变量

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

ISC

## 🔗 相关链接

- [设计系统色彩理论](https://ant.design/docs/spec/colors-cn)
- [CSS自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)
- [HSV色彩空间](https://zh.wikipedia.org/wiki/HSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4)

---

**@nova-fe/color** - 让色彩设计更科学，让主题切换更优雅。
