import * as fs from "fs-extra";
import * as sass from "sass";
import { lightPalettes, darkPalettes } from "../src/palette";

type ThemeVariables = Record<string, string>;
type ThemeData = {
  css: string;
  variables: ThemeVariables;
};

const generateThemeVariables = (
  name: string,
  colors: string[],
  themeObj: ThemeVariables
): string => {
  return colors
    .map((color, index) => {
      const varName = `--${name}-${index + 1}`;
      themeObj[varName] = color;
      return `${varName}: ${color};`;
    })
    .join("\n    ");
};

const generateCombinedCSS = (
  lightData: ThemeData,
  darkData: ThemeData
): string => {
  const cssCode = `:root {
    /* Light theme colors */
    ${lightData.css}
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme colors */
    ${darkData.css}
  }
}`;

  return sass.compileString(cssCode).css;
};

const generateThemeData = (palette: Record<string, string[]>): ThemeData => {
  const themeObj: ThemeVariables = {};
  const colorsData: string[] = [];

  Object.keys(palette).forEach((key) => {
    colorsData.push(generateThemeVariables(key, palette[key], themeObj));
  });

  return {
    css: colorsData.join("\n    "),
    variables: themeObj,
  };
};

const main = async () => {
  try {
    console.log("🚀 开始生成主题...");

    const lightTheme = generateThemeData(lightPalettes);
    const darkTheme = generateThemeData(darkPalettes);
    const combinedCSS = generateCombinedCSS(lightTheme, darkTheme);

    fs.outputFileSync("dist/system/theme.css", combinedCSS);
    fs.outputFileSync(
      "dist/system/theme-variables.ts",
      `export const lightThemeVariables = ${JSON.stringify(lightTheme.variables, null, 2)};\n` +
        `export const darkThemeVariables = ${JSON.stringify(darkTheme.variables, null, 2)};\n`
    );

    console.log("✅ 主题生成成功！");
    console.log("📁 生成文件：");
    console.log("  - dist/system/theme.css");
    console.log("  - dist/system/theme-variables.ts");
  } catch (error) {
    console.error("❌ 主题生成失败：", error);
    process.exit(1);
  }
};

main();
