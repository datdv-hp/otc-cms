import type { LinkOptions as TiptapLinkOptions } from '@tiptap/extension-link';
import { Link as TiptapLink } from '@tiptap/extension-link';

import LinkActionButton from '../components/LinkActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface LinkOptions extends TiptapLinkOptions, GeneralOptions {
  button: ButtonView;
}

export const Link = TiptapLink.extend<LinkOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: true,
      button: ({ editor, t }) => ({
        component: LinkActionButton,
        componentProps: {
          isActive: () => editor.isActive('link') || false,
          icon: 'link',
          tooltip: t('tiptapEditor.link.tooltip')
        }
      })
    };
  }
});
