<script setup lang="ts">
import { ref } from 'vue';
import type { Editor } from '@tiptap/vue-3';
import LinkDialog from './LinkDialog.vue';
import ActionButton from './ActionButton.vue';
import { ButtonViewReturnComponentProps, IconOptions } from '../types';

interface Props {
  editor: Editor;
  icon?: IconOptions;
  tooltip?: string;
  disabled?: boolean;
  color?: string;
  action?: ButtonViewReturnComponentProps['action'];
  isActive?: ButtonViewReturnComponentProps['isActive'];
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  tooltip: undefined,
  disabled: false,
  color: undefined,
  action: undefined,
  isActive: undefined
});

const href = ref<string | undefined>(undefined);
const isOpen = ref<boolean>(false);

function onAction() {
  const { href: _href } = props.editor.getAttributes('link');
  href.value = _href;
  isOpen.value = true;
}

function closeDialog() {
  isOpen.value = false;
}
</script>

<template>
  <ActionButton
    :icon="icon"
    :tooltip="tooltip"
    :is-disabled="disabled"
    :color="color"
    :is-active="isActive"
    :action="onAction"
  >
    <LinkDialog v-if="isOpen" :editor="editor" :value="href" @close="closeDialog" />
  </ActionButton>
</template>
