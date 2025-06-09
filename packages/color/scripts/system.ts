import * as fs from "fs-extra";
import * as path from "path";
import * as sass from "sass";
import { lightPalettes, darkPalettes } from "../src/palette";

type ThemeVariables = Record<string, string>;
type ThemeData = {
  css: string;
  variables: ThemeVariables;
};

// 获取当前脚本名称（不带扩展名）
const scriptName = path.basename(__filename, path.extname(__filename));

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

    const outputDir = path.join("dist", scriptName); // dist/system
    fs.ensureDirSync(outputDir);

    const lightTheme = generateThemeData(lightPalettes);
    const darkTheme = generateThemeData(darkPalettes);
    const combinedCSS = generateCombinedCSS(lightTheme, darkTheme);

    const cssPath = path.join(outputDir, "theme.css");
    const varsPath = path.join(outputDir, "theme-variables.ts");

    fs.outputFileSync(cssPath, combinedCSS);
    fs.outputFileSync(
      varsPath,
      `export const lightThemeVariables = ${JSON.stringify(lightTheme.variables, null, 2)};\n` +
        `export const darkThemeVariables = ${JSON.stringify(darkTheme.variables, null, 2)};\n`
    );

    console.log("✅ 主题生成成功！");
    console.log("📁 生成文件：");
    console.log(`  - ${cssPath}`);
    console.log(`  - ${varsPath}`);
  } catch (error) {
    console.error("❌ 主题生成失败：", error);
    process.exit(1);
  }
};

main();
