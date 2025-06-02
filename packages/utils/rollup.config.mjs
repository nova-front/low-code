import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
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
    commonjs(),
    nodeResolve(),
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
