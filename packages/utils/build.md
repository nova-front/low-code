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
