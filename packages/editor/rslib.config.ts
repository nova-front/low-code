import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: [
        "./src/**/*.ts",
        "./src/**/*.tsx",
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.json",
      ],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
    copy: [
      // `./src/assets/image.png` -> `./dist/assets/image.png`
      { from: "./src/assets", to: "assets" },
    ],
  },
  plugins: [pluginReact()],
});
