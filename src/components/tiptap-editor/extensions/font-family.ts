import type { FontFamilyOptions as TiptapFontFamilyOptions } from '@tiptap/extension-font-family';
import { FontFamily as TiptapFontFamily } from '@tiptap/extension-font-family';

import type { Item } from '../components/FontFamilyActionButton.vue';
import FontFamilyActionButton from '../components/FontFamilyActionButton.vue';

import { DEFAULT_FONT_FAMILY_LIST, DEFAULT_FONT_FAMILY_VALUE } from '../constants/define';
import type { ButtonView, FontFamilyProps, GeneralOptions } from '../types';

export interface FontFamilyOptions extends TiptapFontFamilyOptions, GeneralOptions {
  button: ButtonView<FontFamilyOptions>;
  fontFamilies: FontFamilyProps[];
}

export const FontFamily = /* @__PURE__*/ TiptapFontFamily.extend<FontFamilyOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      fontFamilies: DEFAULT_FONT_FAMILY_LIST,
      button: ({ editor, extension, t }) => {
        const fontFamilies = (extension.options?.fontFamilies as FontFamilyProps[]) || [];

        const items: Item[] = fontFamilies.map((font) => ({
          title: font.title,
          value: font.value,
          isActive: () => {
            const { fontFamily } = editor.getAttributes('textStyle');
            const isDefault = font.value === DEFAULT_FONT_FAMILY_VALUE;
            if (isDefault && !fontFamily) {
              return true;
            }
            return editor.isActive({ fontFamily: font.value }) || false;
          },
          action: () => {
            if (font.value === DEFAULT_FONT_FAMILY_VALUE) {
              editor.chain()?.unsetFontFamily()?.focus()?.run();
              return;
            }

            editor.chain()?.setFontFamily(font.value)?.focus()?.run();
          },
          style: { fontFamily: font.value },
          divider: font.divider ?? false,
          default: font.default ?? false
        }));

        return {
          component: FontFamilyActionButton,
          componentProps: {
            icon: 'fontFamily',
            tooltip: t('tiptapEditor.fontFamily.tooltip'),
            items,
            maxHeight: 280
          }
        };
      }
    };
  }
});
