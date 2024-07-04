import {
  Blockquote as TiptapBlockquote,
  type BlockquoteOptions as TiptapBlockquoteOptions
} from '@tiptap/extension-blockquote';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface BlockquoteOptions extends TiptapBlockquoteOptions, GeneralOptions {
  button: ButtonView;
}

export const Blockquote = TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote'
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.toggleBlockquote()?.focus().run(),
          isActive: () => editor.isActive('blockquote') || false,
          icon: 'blockquote',
          tooltip: t('tiptapEditor.blockquote.tooltip')
        }
      })
    };
  }
});
