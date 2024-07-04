<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Editor } from '@tiptap/vue-3';

import ActionButton from './ActionButton.vue';
import ColorPicker from './ColorPicker.vue';

import { ButtonViewReturnComponentProps, type IconOptions } from '../types';

interface Props {
  editor: Editor;
  icon?: IconOptions;
  tooltip?: string;
  disabled?: boolean;
  action?: ButtonViewReturnComponentProps['action'];
  isActive?: ButtonViewReturnComponentProps['isActive'];
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  tooltip: undefined,
  disabled: false,
  action: undefined,
  isActive: undefined
});

const color = ref();

function onChange(color: string) {
  props.action?.(color);
}

watchEffect(() => {
  const { color: colorValue } = props.editor.getAttributes('textStyle');
  color.value = colorValue;
});
</script>

<template>
  <ActionButton
    class="compact"
    :icon="icon"
    :tooltip="tooltip"
    :is-disabled="disabled"
    :color="color"
    :is-active="isActive"
  >
    <ColorPicker v-model="color" @change="onChange" />
  </ActionButton>
</template>
