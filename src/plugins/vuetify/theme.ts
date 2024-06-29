import { SupportTheme } from '@/common/constants/common.constant';
import type { VuetifyOptions } from 'vuetify';

export const staticPrimaryColor = '#696CFF';

const theme: VuetifyOptions['theme'] = {
  defaultTheme: SupportTheme.DARK,
  themes: {
    dark: {
      dark: true,
      colors: {
        primary: '#059212',
        'on-primary': '#fff',
        secondary: '#C5E1A5',
        'on-secondary': '#000',
        success: '#83bf6e',
        'on-success': '#fcfcfc',
        info: '#00BCD4',
        'on-info': '#fcfcfc',
        warning: '#ff9048',
        'on-warning': '#fcfcfc',
        error: '#ff6a55',
        'on-error': '#fcfcfc',
        background: '#111315',
        'on-background': '#fcfcfc',
        surface: '#1a1d1f',
        'on-surface': '#fcfcfc',
        'grey-50': '#2A2E42',
        'grey-100': '#444463',
        'grey-200': '#4A5072',
        'grey-300': '#5E6692',
        'grey-400': '#7983BB',
        'grey-500': '#8692D0',
        'grey-600': '#AAB3DE',
        'grey-700': '#B6BEE3',
        'grey-800': '#CFD3EC',
        'grey-900': '#E7E9F6',
        'perfect-scrollbar-thumb': '#4A5072',
        'skin-bordered-background': '#2b2c40',
        'skin-bordered-surface': '#2b2c40',
        border: 'rgb(133, 133, 133)'
      },
      variables: {
        'code-color': '#2CF019',
        'overlay-scrim-background': '#0D0E24',
        'overlay-scrim-opacity': 0.6,
        'border-color': '#DBDBEB',
        'snackbar-background': '#DBDBEB',
        'snackbar-color': '#2B2C40',
        'tooltip-background': '#464A65',
        'tooltip-opacity': 0.9,
        'table-header-background': '#3A3E5B',
        // Shadows
        'shadow-key-umbra-opacity': 'rgba(20, 21, 33, 0.06)',
        'shadow-key-penumbra-opacity': 'rgba(20, 21, 33, 0.04)',
        'shadow-key-ambient-opacity': 'rgba(20, 21, 33, 0.02)'
      }
    }
  }
};

export default theme;
