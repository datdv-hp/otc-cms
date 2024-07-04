import { Extension } from '@tiptap/core';
import ActionButton from '../components/ActionButton.vue';
import type { ButtonView, GeneralOptions } from '../types';

export interface IndentOptions extends GeneralOptions {
  button: ButtonView;
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      divider: false,
      spacer: false,
      button: ({ editor, t }) => {
        const items: ['indent', 'outdent'] = ['indent', 'outdent'];

        return items.map((item) => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'indent') editor.chain()?.sinkListItem('listItem')?.focus()?.run();
              if (item === 'outdent') editor.chain()?.liftListItem('listItem')?.focus()?.run();
            },
            icon: item,
            tooltip: t(`tiptapEditor.${item}.tooltip`)
          }
        }));
      }
    };
  }
});
