import { Bold as TiptapBold, type BoldOptions as TiptapBoldOptions } from '@tiptap/extension-bold';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface BoldOptions extends TiptapBoldOptions, GeneralOptions {
  button: ButtonView;
}

export const Bold = TiptapBold.extend<BoldOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.toggleBold()?.focus()?.run(),
          isActive: () => editor.isActive('bold') || false,
          disabled: !editor.can().chain().focus().toggleBold().run(),
          icon: 'bold',
          tooltip: t('tiptapEditor.bold.tooltip')
        }
      })
    };
  }
});
