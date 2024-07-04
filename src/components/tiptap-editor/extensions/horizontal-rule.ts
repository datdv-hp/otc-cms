import type { HorizontalRuleOptions as TiptapHorizontalRuleOptions } from '@tiptap/extension-horizontal-rule';
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule';

import ActionButton from '../components/ActionButton.vue';

import type { ButtonView, GeneralOptions } from '../types';

export interface HorizontalRuleOptions extends TiptapHorizontalRuleOptions, GeneralOptions {
  button: ButtonView;
}

export const HorizontalRule = TiptapHorizontalRule.extend<HorizontalRuleOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain()?.setHorizontalRule()?.focus()?.run(),
          icon: 'horizontalRule',
          tooltip: t('tiptapEditor.horizontalrule.tooltip')
        }
      })
    };
  }
});
