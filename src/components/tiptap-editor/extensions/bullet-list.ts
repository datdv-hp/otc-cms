import type { BulletListOptions as TiptapBulletListOptions } from '@tiptap/extension-bullet-list';
import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface BulletListOptions extends TiptapBulletListOptions, GeneralOptions {
  button: ButtonView;
}

export const BulletList = TiptapBulletList.extend<BulletListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().toggleBulletList()?.focus()?.run(),
          isActive: () => editor.isActive('bulletList') || false,
          icon: 'bulletList',
          tooltip: t('tiptapEditor.bulletedList.tooltip')
        }
      })
    };
  }
});
