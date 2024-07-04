import {
  History as TiptapHistory,
  type HistoryOptions as TiptapHistoryOptions
} from '@tiptap/extension-history';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface HistoryOptions extends TiptapHistoryOptions, GeneralOptions {
  button: ButtonView;
}

export const History = TiptapHistory.extend<HistoryOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      depth: 10,
      button: ({ editor, t }) => {
        const histories: ['undo', 'redo'] = ['undo', 'redo'];
        const result = histories.map((item) => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'undo') editor.chain()?.undo()?.focus()?.run();
              if (item === 'redo') editor.chain()?.redo()?.focus()?.run();
            },
            disabled:
              item === 'undo'
                ? !editor.can().chain().undo().run()
                : item === 'redo'
                  ? !editor.can().chain().redo().run()
                  : undefined,
            icon: item,
            tooltip: t(`tiptapEditor.${item}.tooltip`)
          }
        }));
        return result;
      }
    };
  }
});
