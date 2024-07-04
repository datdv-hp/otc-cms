<script setup lang="ts">
import type { StyleValue } from 'vue';
import { computed, ref } from 'vue';
import type { Editor } from '@tiptap/vue-3';

import ActionButton from './ActionButton.vue';
import type { ButtonViewReturnComponentProps, IconOptions } from '../types';
import { getIcon } from '../utils';

interface Props {
  editor: Editor;
  disabled?: boolean;
  color?: string;
  maxHeight?: string | number;
  icon?: IconOptions;
  tooltip?: string;
  items?: Item[];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  maxHeight: undefined,

  icon: undefined,
  tooltip: '',
  items: () => []
});

const menu = ref<boolean>(false);

const active = computed<Item>(() => {
  const find = props.items.find((k) => k.isActive());
  if (find && !find.default) {
    return {
      ...find,
      icon: find.icon ? find.icon : props.icon
    };
  }

  const item: Item = {
    title: props.tooltip,
    icon: props.icon,
    isActive: () => false
  };

  return item;
});
</script>

<script lang="ts">
export interface Item {
  title: string;
  value?: string;
  icon?: IconOptions;
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>;
  action?: ButtonViewReturnComponentProps['action'];
  style?: StyleValue;
  divider?: boolean;
  default?: boolean;
}
</script>

<template>
  <ActionButton
    :icon="active.icon"
    :tooltip="active.title"
    :is-disabled="disabled"
    :color="color"
    :is-active="active.isActive"
  >
    <v-menu v-model="menu" activator="parent">
      <v-list density="compact" :max-height="maxHeight">
        <template v-for="(item, index) in items" :key="index">
          <v-list-item :active="item.isActive()" @click="item.action">
            <template #prepend>
              <VIcon v-if="item.icon" :icon="getIcon(item.icon)" />
            </template>

            <v-list-item-title :style="item.style">{{ item.title }}</v-list-item-title>
          </v-list-item>

          <v-divider :key="index" v-if="item.divider" />
        </template>
      </v-list>
    </v-menu>
  </ActionButton>
</template>
