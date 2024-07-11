<script setup lang="ts">
import { translateYupError } from '@/common/helper';
import { AnyExtension, EditorContent, useEditor, type Content } from '@tiptap/vue-3';
import { useDebounceFn } from '@vueuse/core';
import Dompurify from 'isomorphic-dompurify';
import { isNumber } from 'lodash';
import { computed, onBeforeUnmount, unref, watch } from 'vue';
import TiptapToolbar from './TiptapToolbar.vue';
import { BaseKit } from './extensions/base-kit';
import { Bold } from './extensions/bold';
import { BulletList } from './extensions/bullet-list';
import { Color } from './extensions/color';
import { FontFamily } from './extensions/font-family';
import { FontSize } from './extensions/font-size';
import { Heading } from './extensions/heading';
import { History } from './extensions/history';
import { Italic } from './extensions/italic';
import { Link } from './extensions/link';
import { OrderedList } from './extensions/ordered-list';
import { Strike } from './extensions/strike';
import { TextAlign } from './extensions/text-align';
import { Underline } from './extensions/underline';
import { CoreEditor, EditorOnChangeValue } from './types';

enum OutputType {
  HTML = 'html',
  JSON = 'json',
  TEXT = 'text'
}
type Props = {
  modelValue?: Content;
  editable?: boolean;
  bgColor?: string;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  extensions?: AnyExtension[];
  maxLength?: number;
  counter?: boolean;
  hideToolbar?: boolean;
  outputType?: OutputType;
  errorMessage?:
    | string
    | {
        i18nKey: string;
        params?: Record<string, string>;
      };
};
type IEmits = {
  (event: 'focus'): void;
  (event: 'blur'): void;
  (event: 'update:modelValue', value: Props['modelValue']): void;
  (event: 'change', value: EditorOnChangeValue): void;
};
const emits = defineEmits<IEmits>();

const props = withDefaults(defineProps<Props>(), {
  editable: true,
  maxLength: 10000,
  counter: true,
  hideToolbar: false,
  outputType: OutputType.HTML,
  extensions: () => [
    History.configure({ divider: true, order: 0, showBreakpoint: 620 }),
    FontFamily.configure({ divider: true, order: 1 }),
    FontSize.configure({ order: 2, divider: true }),
    Heading.configure({ order: 2 }),
    Bold.configure({ order: 3 }),
    Italic.configure({ order: 4 }),
    Underline.configure({ order: 5, showBreakpoint: 620 }),
    Strike.configure({ order: 5, showBreakpoint: 620 }),
    Color.configure({ order: 6, divider: true }),
    TextAlign.configure({ order: 7 }),
    OrderedList.configure({ order: 8 }),
    BulletList.configure({ order: 9, divider: true }),
    Link.configure({ order: 10, showBreakpoint: 620 })
  ]
});
const extensions = computed(() => {
  const _extensions = [
    BaseKit.configure({
      placeholder: { placeholder: props.placeholder },
      characterCount: isNumber(props.maxLength) ? { limit: props.maxLength } : false
    }),
    ...props.extensions
  ];
  return _extensions;
});

const editor = useEditor({
  content: props.modelValue,
  editable: props.editable,
  extensions: unref(extensions),
  onFocus: () => {
    emits('focus');
  },
  onBlur: () => {
    emits('blur');
  },
  onUpdate: useDebounceFn(({ editor }) => {
    const output = getOutput(editor, props.outputType);
    emits('update:modelValue', output);
    emits('change', { editor, output });
  }, 300)
});

function getOutput(editor: CoreEditor, output: Props['outputType']) {
  switch (output) {
    case OutputType.HTML:
      if (editor.isEmpty) return '';
      return editor.getHTML();
    case OutputType.JSON:
      if (editor.isEmpty) return {};
      return editor.getJSON();
    case OutputType.TEXT:
      if (editor.isEmpty) return '';
      return editor.getText();
    default:
      return '';
  }
}

const onValueChange = (value: Props['modelValue']) => {
  if (!editor.value) return;
  const output = getOutput(editor.value, props.outputType);
  if (value !== output) {
    let _value = value;
    const { from, to } = editor.value.state.selection;
    if (typeof value === 'string') {
      _value = Dompurify.sanitize(_value as string, {
        USE_PROFILES: { html: true }
      });
    }
    editor.value?.commands?.setContent(_value || null, false, {
      preserveWhitespace: true
    });
    editor.value?.commands?.setTextSelection({ from, to });
  }
};

watch(() => props.modelValue, onValueChange);

function insertContent(value: string) {
  editor.value?.commands.insertContent(value);
  editor.value?.commands.focus();
}

onBeforeUnmount(() => {
  editor.value?.destroy();
});

defineExpose({
  insertContent,
  editor
});
</script>
<template>
  <div>
    <div v-if="label" class="text-form-label">
      {{ label }}
      <span v-if="isRequired" class="mark-required">*</span>
    </div>
    <div class="editor-wrapper" :class="{ error: !!errorMessage }">
      <div v-if="editor && !hideToolbar" class="toolbar">
        <TiptapToolbar :editor="editor" />
      </div>
      <div class="wrapper-content">
        <editor-content :style="{ backgroundColor: bgColor }" :editor="editor" />
      </div>
      <div v-if="maxLength && counter" class="counter">
        {{ editor?.storage?.characterCount?.characters() }} / {{ maxLength }}
      </div>
    </div>
    <span class="error-message" v-if="!!errorMessage">
      {{ translateYupError(errorMessage || '') }}
    </span>
  </div>
</template>
<style lang="scss" scoped>
.mark-required {
  color: $color-primary-3;
}

.editor-wrapper {
  border-radius: 8px;
  outline: 1px solid $color-neutral-6;
  position: relative;
  transition: outline 0.15s linear;
  .wrapper-content {
    font-family: sans-serif;
  }

  &.error {
    outline: 1px solid $color-primary-3;
  }

  .error-message {
    margin-inline-start: 8px;
    color: $color-primary-3;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }

  &:hover:not(.error) {
    outline: 1px solid $color-primary-1;
  }

  .counter {
    font-family: 'Be Vietnam Pro';
    font-size: 12px;
    text-align: right;
    position: absolute;
    color: $color-neutral-4;
    bottom: 2px;
    right: 16px;
  }
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-bottom: 1px solid $color-neutral-6;
  :deep(.v-toolbar) {
    border-radius: 4px 4px 0 0 !important;
  }
  button {
    border-radius: 4px;
    background-color: transparent;
    height: 28px;
    width: 28px;
    font-size: 12px;
    transition: all 0.2s ease-in-out;
    &:not(:disabled) {
      color: $color-neutral-8;
    }
    &.is-active {
      background-color: $color-primary-1;
      color: $color-neutral-0;
    }
  }
}

:deep(.ProseMirror) {
  outline: none;
  border-radius: 4px;
  padding: 16px;
  min-height: 200px;
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: $color-neutral-8;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  &.ProseMirror-focused {
    outline: none;
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }
}
</style>
