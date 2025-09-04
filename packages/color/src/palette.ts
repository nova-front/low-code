import { generateColors } from './utils';

// Define a type that extends string[] with an additional primary property
type ColorPalette = string[] & { primary: string };

// Our palettes will be a record of color names to ColorPalette
type PalettesProps = Record<string, ColorPalette>;

// Base colors with type safety
const PRESET_SYSTEM_COLORS = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1677FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666',
} as const;

// Helper function to generate palettes
const generatePalette = (
  colors: typeof PRESET_SYSTEM_COLORS,
  options?: { theme?: 'dark'; backgroundColor?: string }
): PalettesProps => {
  const palettes: PalettesProps = {} as PalettesProps;

  (Object.keys(colors) as Array<keyof typeof colors>).forEach((key) => {
    const palette = (
      options
        ? generateColors(colors[key], options)
        : generateColors(colors[key])
    ) as ColorPalette;

    palette.primary = palette[5];
    palettes[key] = palette;
  });

  return palettes;
};

// Light palettes (default)
export const lightPalettes = generatePalette(PRESET_SYSTEM_COLORS);

// Dark palettes
export const darkPalettes = generatePalette(PRESET_SYSTEM_COLORS, {
  theme: 'dark',
  backgroundColor: '#141414',
});
