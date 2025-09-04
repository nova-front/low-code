import { createTheme, ThemeOptions } from '@mui/material/styles';

// 定义自定义主题的配置选项
const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
};

// 创建并导出自定义主题
export const customTheme = createTheme(themeOptions);
