import type { ColorOptions as TiptapColorOptions } from '@tiptap/extension-color';
import { Color as TiptapColor } from '@tiptap/extension-color';

import ColorActionButton from '../components/ColorActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface ColorOptions extends TiptapColorOptions, GeneralOptions {
  button: ButtonView;
}

export const Color = TiptapColor.extend<ColorOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ColorActionButton,
        componentProps: {
          action: (color?: unknown) => {
            if (typeof color === 'string') editor.chain()?.setColor(color)?.focus()?.run();
          },
          isActive: () => {
            const { color } = editor.getAttributes('textStyle');

            if (!color) return false;
            return editor.isActive({ color }) || false;
          },
          icon: 'color',
          tooltip: t('tiptapEditor.color.tooltip')
        }
      })
    };
  }
});
