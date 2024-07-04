import type { Editor as _CoreEditor, Extension, JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/vue-3';
import icons from './constants/icons';

export type IconOptions = keyof typeof icons;
export type CoreEditor = _CoreEditor;

export type EditorOnChangeValue = {
  editor: CoreEditor;
  output: string | JSONContent;
};

export interface GeneralOptions {
  divider: boolean;
  spacer: boolean;
  order?: number;
  showBreakpoint?: number; // show if toolbar width is greater than this number
}

export interface ButtonViewReturnComponentProps {
  action?: (value?: unknown) => void;
  isActive?: () => boolean;
  disabled?: boolean;
  icon?: IconOptions;
  tooltip?: string;
  [x: string]: any;
}

export interface ButtonViewReturn {
  component: unknown;
  componentProps: ButtonViewReturnComponentProps;
}

export interface ButtonViewParams<T = any> {
  editor: Editor;
  extension: Extension<T>;
  t: (path: string) => string;
}

export interface ButtonView<T = any> {
  (options: ButtonViewParams<T>): ButtonViewReturn | ButtonViewReturn[];
}

export interface FontFamilyProps {
  title: string;
  value: string;
  divider?: boolean;
  default?: boolean;
}
