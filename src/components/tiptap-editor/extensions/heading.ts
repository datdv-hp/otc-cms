import type { HeadingOptions as TiptapHeadingOptions } from '@tiptap/extension-heading';
import { Heading as TiptapHeading } from '@tiptap/extension-heading';
import { Extension } from '@tiptap/vue-3';
import type { Item } from '../components/ActionMenuButton.vue';
import ActionMenuButton from '../components/ActionMenuButton.vue';
import type { ButtonView, GeneralOptions } from '../types';
import { BaseKitOptions } from './base-kit';

export interface HeadingOptions extends TiptapHeadingOptions, GeneralOptions {
  button: ButtonView<HeadingOptions>;
}

export const Heading = TiptapHeading.extend<HeadingOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1, 2, 3, 4, 5, 6],
      button: ({ editor, extension, t }) => {
        const { extensions = [] } = editor.extensionManager ?? [];
        const levels = extension.options?.levels || [];
        const baseKitExt = extensions.find(
          (k) => k.name === 'base-kit'
        ) as Extension<BaseKitOptions>;
        const items: Item[] = levels.map((level) => ({
          action: () => editor.chain()?.toggleHeading({ level })?.focus()?.run(),
          isActive: () => editor.isActive('heading', { level }) || false,
          icon: `h${level}`,
          title: t(`tiptapEditor.heading.h${level}.tooltip`)
        }));
        if (baseKitExt && baseKitExt.options.paragraph !== false) {
          items.unshift({
            action: () => editor.chain()?.setParagraph()?.focus()?.run(),
            isActive: () => editor.isActive('paragraph') || false,
            icon: 'p',
            title: t('tiptapEditor.paragraph.tooltip'),
            divider: true
          });
        }

        return {
          component: ActionMenuButton,
          componentProps: {
            icon: 'heading',
            tooltip: t('tiptapEditor.heading.tooltip'),
            items
          }
        };
      }
    };
  }
});
