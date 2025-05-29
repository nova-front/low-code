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
