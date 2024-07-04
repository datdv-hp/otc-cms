import { Extension } from '@tiptap/core';
import type { Item } from '../components/ActionMenuButton.vue';
import FontSizeActionButton from '../components/FontSizeActionButton.vue';
import { DEFAULT_FONT_SIZE_LIST, DEFAULT_FONT_SIZE_VALUE } from '../constants/define';
import type { ButtonView, GeneralOptions } from '../types';

export interface FontSizeOptions extends GeneralOptions {
  button: ButtonView<FontSizeOptions>;
  types: string[];
  fontSizes: number[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      ...this.parent?.(),
      types: ['textStyle'],
      fontSizes: DEFAULT_FONT_SIZE_LIST,
      button: ({ editor, extension, t }) => {
        const fontSizes = (extension.options?.fontSizes as FontSizeOptions['fontSizes']) || [];

        const items: Item[] = [DEFAULT_FONT_SIZE_VALUE, ...fontSizes].map((size) => ({
          title: size === DEFAULT_FONT_SIZE_VALUE ? `${DEFAULT_FONT_SIZE_VALUE}` : String(size),
          value: String(size),
          isActive: () => {
            const { fontSize } = editor.getAttributes('textStyle');
            const isDefault = size === DEFAULT_FONT_SIZE_VALUE;
            if (isDefault && !fontSize) {
              return true;
            }
            return editor.isActive({ fontSize: String(size) }) || false;
          },
          action: () => {
            if (size === DEFAULT_FONT_SIZE_VALUE) {
              editor.chain()?.unsetFontSize()?.focus()?.run();
              return;
            }

            editor.chain()?.setFontSize(String(size))?.focus()?.run();
          },
          divider: size === DEFAULT_FONT_SIZE_VALUE ?? false,
          default: size === DEFAULT_FONT_SIZE_VALUE ?? false
        }));

        return {
          component: FontSizeActionButton,
          componentProps: {
            icon: 'fontSize',
            tooltip: t('tiptapEditor.fontSize.tooltip'),
            items,
            maxHeight: 280
          }
        };
      }
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || '',
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}px`
              };
            }
          }
        }
      }
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
        }
    };
  }
});
