import type { ItalicOptions as TiptapItalicOptions } from '@tiptap/extension-italic';
import { Italic as TiptapItalic } from '@tiptap/extension-italic';
import ActionButton from '../components/ActionButton.vue';
import type { ButtonView, GeneralOptions } from '../types';

export interface ItalicOptions extends TiptapItalicOptions, GeneralOptions {
  button: ButtonView;
}

export const Italic = TiptapItalic.extend<ItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.toggleItalic()?.focus()?.run(),
          isActive: () => editor.isActive('italic') || false,
          disabled: !editor.can().chain().focus().toggleItalic().run(),
          icon: 'italic',
          tooltip: t('tiptapEditor.italic.tooltip')
        }
      })
    };
  }
});
