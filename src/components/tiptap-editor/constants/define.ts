import { FontFamilyProps } from '../types';

export const DEFAULT_FONT_SIZE_LIST = [8, 10, 12, 14, 18, 20, 24, 30, 36, 48, 60, 72];

export const DEFAULT_FONT_SIZE_VALUE = 16;

export const COLORS_LIST = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#D5D5D4',
  '#E8E8E8',
  '#EEEEEE'
];

export const DEFAULT_FONT_FAMILY_VALUE = 'sans-serif';

export const DEFAULT_FONT_FAMILY_LIST: FontFamilyProps[] = [
  {
    title: 'Sans Serif',
    value: DEFAULT_FONT_FAMILY_VALUE,
    divider: true,
    default: true
  },
  { title: 'Arial', value: 'Arial' },
  { title: 'Arial Black', value: 'Arial Black' },
  { title: 'Georgia', value: 'Georgia' },
  { title: 'Impact', value: 'Impact' },
  { title: 'Helvetica', value: 'Helvetica' },
  { title: 'Tahoma', value: 'Tahoma' },
  { title: 'Times New Roman', value: 'Times New Roman' },
  { title: 'Verdana', value: 'Verdana' },
  { title: 'Courier New', value: 'Courier New', divider: true },
  { title: 'Monaco', value: 'Monaco' },
  { title: 'Monospace', value: 'monospace' }
];
