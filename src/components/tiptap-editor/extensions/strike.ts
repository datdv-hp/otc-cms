import type { StrikeOptions as TiptapStrikeOptions } from '@tiptap/extension-strike';
import { Strike as TiptapStrike } from '@tiptap/extension-strike';
import ActionButton from '../components/ActionButton.vue';
import type { ButtonView, GeneralOptions } from '../types';
export interface StrikeOptions extends TiptapStrikeOptions, GeneralOptions {
  button: ButtonView;
}

export const Strike = TiptapStrike.extend<StrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleStrike(),
          isActive: () => editor.isActive('strike') || false,
          disabled: !editor.can().chain().focus().toggleStrike().run(),
          icon: 'strike',
          tooltip: t('tiptapEditor.strike.tooltip')
        }
      })
    };
  }
});
