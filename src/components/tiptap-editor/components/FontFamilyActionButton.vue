<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type { StyleValue } from 'vue';

import { computed } from 'vue';
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

const active = computed<Item>(() => {
  const find = props.items.find((k) => k.isActive());
  if (find) {
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
  <v-select
    :items="items"
    density="compact"
    :disabled="disabled"
    :color="color"
    :model-value="active.value"
    :hide-details="true"
    class="list"
    variant="plain"
  >
    <template #prepend-item>
      <span class="menu-title">{{ props.tooltip }}</span>
    </template>
    <template #selection="{ item }">
      <span class="selection" :style="active.style">
        {{ item.title }}
      </span>
    </template>
    <template #item="{ item, props, index }">
      <v-list-item
        v-bind="props"
        density="compact"
        :active="item.raw.isActive()"
        @click="item.raw.action"
      >
        <template #prepend>
          <VIcon v-if="item.raw.icon" :icon="getIcon(item.raw.icon)" />
        </template>
        <template #title="{ title }">
          <span :style="item.raw.style">{{ title }}</span>
        </template>
      </v-list-item>
      <v-divider :key="index" v-if="item.raw.divider" />
    </template>
  </v-select>
</template>
<style lang="scss" scoped>
.list {
  width: 110px;
  min-width: 110px;
  max-width: 110px;
  :deep(.v-field__input) {
    min-height: 28px;
    max-height: 28px;
    padding: 4px 0 4px 12px;
    height: 28px;
  }
  :deep(.v-select__selection) {
    margin: 0;
    align-items: center;
    .selection {
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      line-height: 18px;
    }
  }

  :deep(.v-field) {
    padding-right: 4px;
  }
  :deep(.v-field__append-inner) {
    padding: 0;
    font-size: 12px;
    align-items: center;
  }
}
.menu-title {
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}
</style>
