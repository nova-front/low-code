# 工具库

## 核心库

Rollup - 当前使用版本 4.41.1

## 开始

```bash
# 新建项目 utils

# 根目录 init package.json
npm init -y

# 本地安装Rollup
npm install rollup --save-dev

# 安装相应插件
npm install @rollup/plugin-json @rollup/plugin-terser @rollup/plugin-typescript rollup-plugin-delete rollup-plugin-dts --save-dev
```

## 代码

根目录新建 src, index.ts, time.ts

```ts
// time.ts
/**
 * 延迟多少毫秒后继续执行
 * @return {Promise}
 */

export function sleep(time: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
```

```ts
// index.ts
export * from "./time";
```

## rollup.config.mjs

```mjs
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
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
    {
      file: "dist/iife.min.js",
      format: "iife",
      name: "utils",
      plugins: [terser()],
    },
  ],
  plugins: [
    del({ targets: "dist" }),
    typescript({
      declaration: false, // 禁用默认声明生成（由dts插件处理）
      outDir: null, // 避免干扰
    }),
    json(),
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

## Jest 单元测试

```bash
# 安装
npm install --save-dev jest @types/jest ts-jest @jest/globals
```

### 修改 tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["jest", "@types/jest"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true
  }
}
```

### jest.config.js

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // 使用 ts-jest 处理 TypeScript
  testEnvironment: "jsdom", // 浏览器环境（服务器环境用 'node'）
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // 路径别名（与 tsconfig.json 一致）
  },
  testMatch: ["**/*.test.ts"], // 匹配测试文件
  collectCoverage: true, // 收集测试覆盖率
  coverageDirectory: "coverage", // 覆盖率报告目录
};
```

### package.json 添加脚本

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
},
```

### release-it

用于自动化版本控制和包发布相关任务。
