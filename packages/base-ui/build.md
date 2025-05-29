# React 组件库

## 核心库

Rollup - 当前使用版本 4.41.1

## 开始

```bash
# 新建项目 base-ui

# 根目录 init package.json
npm init -y

# 本地安装Rollup
npm install rollup --save-dev

# 安装相应插件
npm install @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript rollup-plugin-delete rollup-plugin-dts --save-dev
```

## 代码

根目录新建 src, index.ts, button.tsx

```tsx
// button.tsx
import React from "react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
```

```ts
// index.ts
export * from "./button";
```

## rollup.config.mjs

```mjs
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";

const baseBuild = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
    },
    {
      file: "dist/es/index.js",
      format: "es",
    },
  ],
  external: ["react", "react/jsx-runtime", "react-dom"],
  plugins: [
    del({ targets: "dist" }),
    typescript({
      tsconfig: "./tsconfig.json", // 确保路径正确
      declaration: false, // 禁用默认声明生成（由dts插件处理）
      outDir: null, // 避免干扰
    }),
  ],
};

const dtsBuild = {
  input: "src/index.ts",
  output: {
    file: "dist/es/index.d.ts",
    format: "es",
  },
  plugins: [
    dts({
      compilerOptions: {
        baseUrl: "./",
        paths: {}, // 若有路径映射需填写
      },
    }),
  ],
};

export default [baseBuild, dtsBuild];
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true, //允许从没有默认导出的模块进行默认导入（用于兼容CommonJS模块）
    "esModuleInterop": true, // 启用更兼容的模块导入系统，配合allowSyntheticDefaultImports使用
    "jsx": "react-jsx", // 指定JSX的转换方式为React的JSX运行时
    "jsxImportSource": "react", // 指定JSX运行时库的导入来源为'react'
    "types": ["react", "react-dom"], // 包含React和React-DOM的类型定义（自动包含node_modules/@types下的类型）
    "declaration": false, // 禁用自动生成.d.ts文件（由rollup-plugin-dts插件专门处理类型生成）
    "isolatedModules": true, // 确保每个文件都能被单独编译（适用于非tsc的编译环境）
    "outDir": null // 禁用默认的输出目录（由构建工具如Rollup控制输出位置）
  },
  "exclude": ["dist"] // 排除不需要编译的目录（dist目录通常是构建输出目录）
}
```
