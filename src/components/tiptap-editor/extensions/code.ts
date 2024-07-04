import type { CodeOptions as TiptapCodeOptions } from '@tiptap/extension-code';
import { Code as TiptapCode } from '@tiptap/extension-code';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface CodeOptions extends TiptapCodeOptions, GeneralOptions {
  button: ButtonView;
}

export const Code = TiptapCode.extend<CodeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.toggleCode()?.focus()?.run(),
          isActive: () => editor.isActive('code') || false,
          disabled: !editor.can().chain().focus().toggleCode().run(),
          icon: 'code',
          tooltip: t('tiptapEditor.code.tooltip')
        }
      })
    };
  }
});
