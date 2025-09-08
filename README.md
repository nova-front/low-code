# Low-Code Platform 低代码平台

> 基于 Turborepo 的现代化低代码平台，专注于构建高质量的表单设计器和组件库解决方案。

这是一个企业级的低代码平台项目，提供可视化表单设计器、组件库和配套工具，帮助开发者快速构建表单应用。

## ✨ 特性

- 🚀 **Turborepo** - 高性能的构建系统和 Monorepo 管理
- 📦 **TypeScript** - 100% TypeScript 支持，类型安全
- ⚡ **现代化工具链** - Next.js 15、React 19、Turbopack 等
- 🎨 **Material-UI** - 基于 Material-UI 的组件库
- � **表单设计器** - 可视化拖拽式表单构建工具
- � **JSON Schema** - 标准化的表单配置数据格式

## 🏗️ 项目结构

### 应用 (Apps)

| 应用            | 描述                                     | 技术栈                               | 状态 |
| --------------- | ---------------------------------------- | ------------------------------------ | ---- |
| `form-designer` | 可视化表单设计器，提供拖拽式表单构建功能 | Next.js 15, React 19, React DnD, MUI | ✅   |

### 包 (Packages)

| 包                        | 描述                                        | 状态 |
| ------------------------- | ------------------------------------------- | ---- |
| `@repo/mui`               | Material-UI 二次封装组件库                  | ✅   |
| `@repo/eslint-config`     | ESLint 配置 (包含 Next.js 和 Prettier 配置) | ✅   |
| `@repo/typescript-config` | TypeScript 配置文件                         | ✅   |

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 10.2.4

### 安装依赖

```bash
npm install
```

### 开发

启动表单设计器开发服务器：

```bash
npm run dev
```

访问 http://localhost:3000 查看表单设计器应用。

### 单独运行表单设计器

```bash
cd apps/form-designer
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

### 表单设计器 (form-designer)

一个功能完整的可视化表单构建工具，具有以下特性：

#### 🎯 核心功能

- **拖拽式设计** - 支持组件拖拽排序和配置
- **实时预览** - 所见即所得的表单预览
- **JSON Schema** - 标准化的表单配置数据格式
- **组件库** - 丰富的表单组件支持

#### 📋 支持的组件类型

- `textfield` - 文本输入框
- `textarea` - 多行文本框
- `checkbox` - 复选框
- `radio` - 单选框
- `switch` - 开关
- `select` - 下拉选择
- `autocomplete` - 自动完成输入

#### 🔧 组件配置属性

| 属性         | 类型                                         | 默认值 | 描述         | 适用组件                                      |
| ------------ | -------------------------------------------- | ------ | ------------ | --------------------------------------------- |
| type         | FieldType                                    | -      | 组件类型     | all                                           |
| label        | React.ReactNode                              | -      | 标签文本     | all                                           |
| helperText   | React.ReactNode                              | -      | 辅助性提示语 | all                                           |
| required     | boolean                                      | false  | 是否必填     | all                                           |
| disabled     | boolean                                      | false  | 是否禁用     | all                                           |
| defaultValue | any                                          | -      | 默认值       | all                                           |
| placeholder  | string                                       | -      | 占位符       | textfield、textarea                           |
| options      | string[] \| {label: string, value: string}[] | -      | 选项         | checkbox、radio、switch、select、autocomplete |

#### 🌐 应用页面

- **首页** (`/`) - 项目介绍和导航
- **基础组件** (`/docs`) - 组件库展示
- **表单设计** (`/builder`) - 可视化表单设计器
- **问卷调查** (`/questionnaire`) - 问卷表单示例

## 🛠️ 技术栈

### 核心技术

- **构建工具**: Turborepo 2.5.6, Next.js 15.3.3
- **前端框架**: React 19.1.0
- **开发语言**: TypeScript 5.8.3
- **UI 库**: Material-UI 6.1.5
- **拖拽功能**: React DnD 16.0.1

### 开发工具

- **代码质量**: ESLint, Prettier
- **样式处理**: Emotion, CSS Modules
- **构建优化**: Turbopack (Next.js 15)
- **工具库**: immutability-helper, react-toastify

## 📝 开发指南

### 项目架构

```
low-code/
├── apps/
│   └── form-designer/          # 表单设计器应用
│       ├── app/                # Next.js App Router
│       │   ├── builder/        # 表单构建器页面
│       │   ├── components/     # 共享组件
│       │   ├── docs/           # 文档页面
│       │   └── questionnaire/  # 问卷页面
│       └── package.json
├── packages/
│   ├── eslint-config/          # ESLint 配置
│   ├── mui/                    # Material-UI 组件库
│   └── typescript-config/      # TypeScript 配置
└── package.json
```

### 添加新包

1. 在 `packages/` 目录下创建新包
2. 配置 `package.json`
3. 更新根目录的 `package.json` workspaces
4. 运行 `npm install` 重新安装依赖

### 添加新应用

1. 在 `apps/` 目录下创建新应用
2. 配置相应的构建脚本
3. 更新 `turbo.json` 配置

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License
