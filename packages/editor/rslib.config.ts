import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
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
      // `./assets/image.png` -> `./dist/assets/image.png`
      { from: "./assets", to: "assets" },
    ],
  },
  plugins: [pluginReact()],
});
