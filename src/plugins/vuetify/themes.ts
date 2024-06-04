import type { ThemeDefinition } from 'vuetify';

// background: string;
// surface: string;
// primary: string;
// secondary: string;
// success: string;
// warning: string;
// error: string;
// info: string;
// 'on-background': string;
// 'on-surface': string;
// 'on-primary': string;
// 'on-secondary': string;
// 'on-success': string;
// 'on-warning': string;
// 'on-error': string;
// 'on-info': string;
export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f4f4f4',
    surface: '#fcfcfc',
    // primary: string;
    // secondary: string;
    // success: string;
    // warning: string;
    // error: string;
    // info: string;
    'on-background': '#272B30',
    'on-surface': '#1A1D1F'
    // 'on-primary': string;
    // 'on-secondary': string;
    // 'on-success': string;
    // 'on-warning': string;
    // 'on-error': string;
    // 'on-info': string;
  }
};
export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#111315',
    surface: '#1a1d1f',
    // primary: string;
    // secondary: string;
    // success: string;
    // warning: string;
    // error: string;
    // info: string;
    'on-background': '#EFEFEF',
    'on-surface': '#FCFCFC'
    // 'on-primary': string;
    // 'on-secondary': string;
    // 'on-success': string;
    // 'on-warning': string;
    // 'on-error': string;
    // 'on-info': string;
  }
};
