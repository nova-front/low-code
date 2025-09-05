# Nova Front 新星前线

> "Nova" 有新星之意，象征着新的、创新的。这是一个充满创新和活力的前端蓝图，为前端领域带来新的可能性。

Nova Front 是一个基于 Turborepo 的现代化前端 Monorepo 项目，专注于构建高质量的 React 组件库、低代码平台和富文本编辑器等前端解决方案。

## ✨ 特性

- 🚀 **Turborepo** - 高性能的构建系统和 Monorepo 管理
- 📦 **TypeScript** - 100% TypeScript 支持，类型安全
- ⚡ **现代化工具链** - Vite、Next.js、Storybook 等
- 🎨 **组件库** - 基于 Material-UI 的二次封装组件
- 📝 **富文本编辑器** - 支持拼写检查的高性能编辑器
- 🔧 **低代码平台** - 可视化表单设计器

## 🏗️ 项目结构

### 应用 (Apps)

| 应用            | 描述                                     | 技术栈                          |
| --------------- | ---------------------------------------- | ------------------------------- |
| `form-designer` | 可视化表单设计器，提供拖拽式表单构建功能 | Next.js, React DnD, Material-UI |
| `nova-ui`       | UI 组件展示和测试应用                    | Vite, React, Storybook          |
| `vite-demo`     | Vite 演示应用                            | Vite, React                     |

### 包 (Packages)

| 包                        | 描述                                                  | 版本                                                 |
| ------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| `@nova-fe/editor`         | 支持英语拼写检查的富文本编辑器，支持 2w+ 字符实时编辑 | ![npm](https://img.shields.io/npm/v/@nova-fe/editor) |
| `@repo/base-ui`           | 基础 UI 组件库                                        | -                                                    |
| `@repo/mui`               | Material-UI 二次封装组件库                            | -                                                    |
| `@repo/ui`                | 通用 UI 组件                                          | -                                                    |
| `@repo/color`             | 颜色系统和主题工具                                    | -                                                    |
| `@repo/utils`             | 通用工具函数库                                        | -                                                    |
| `@repo/eslint-config`     | ESLint 配置 (包含 Next.js 和 Prettier 配置)           | -                                                    |
| `@repo/typescript-config` | TypeScript 配置文件                                   | -                                                    |

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 10.2.4

### 安装依赖

```bash
npm install
```

### 开发

启动所有应用的开发服务器：

```bash
npm run dev
```

### 构建

构建所有应用和包：

```bash
npm run build
```

### 代码检查

运行 ESLint 检查：

```bash
npm run lint
```

### 代码格式化

格式化代码：

```bash
npm run format
```

## 📖 详细文档

### 富文本编辑器 (@nova-fe/editor)

一个高性能的富文本编辑器，具有以下特性：

- ✅ 英语拼写检查
- ✅ 支持 50,000+ 字符实时编辑
- ✅ 撤销/重做功能
- ✅ HTML 转文本
- ✅ TypeScript 支持

### 表单设计器 (form-designer)

可视化的表单构建工具：

- 🎯 拖拽式组件设计
- 🎨 实时预览
- 📋 JSON 配置导出
- 🔧 丰富的表单组件

## 🛠️ 技术栈

- **构建工具**: Turborepo, Vite, Next.js
- **前端框架**: React 19
- **UI 库**: Material-UI, 自定义组件库
- **开发语言**: TypeScript
- **代码质量**: ESLint, Prettier, Biome
- **测试**: Jest, Vitest, Storybook
- **其他**: React DnD, Emotion

## 📝 开发指南

### 添加新包

1. 在 `packages/` 目录下创建新包
2. 配置 `package.json`
3. 更新根目录的 `package.json` workspaces
4. 运行 `npm install` 重新安装依赖

### 添加新应用

1. 在 `apps/` 目录下创建新应用
2. 配置相应的构建脚本
3. 更新 `turbo.json` 配置.

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License
