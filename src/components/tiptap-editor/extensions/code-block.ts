import type { CodeBlockOptions as TiptapCodeBlockOptions } from '@tiptap/extension-code-block';
import { CodeBlock as TiptapCodeBlock } from '@tiptap/extension-code-block';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface CodeBlockOptions extends TiptapCodeBlockOptions, GeneralOptions {
  button: ButtonView;
}

export const CodeBlock = TiptapCodeBlock.extend<CodeBlockOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.toggleCodeBlock()?.focus()?.run(),
          isActive: () => editor.isActive('codeBlock') || false,
          icon: 'codeBlock',
          tooltip: t('tiptapEditor.codeblock.tooltip')
        }
      })
    };
  }
});
