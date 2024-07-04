import { Node } from '@tiptap/core';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface ClearOptions extends GeneralOptions {
  button: ButtonView;
}

export const Clear = Node.create<ClearOptions>({
  name: 'clear',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.focus()?.clearNodes()?.unsetAllMarks()?.run(),
          icon: 'clear',
          tooltip: t('tiptapEditor.clear.tooltip')
        }
      })
    };
  }
});
