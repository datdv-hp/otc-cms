<script setup lang="ts">
import { computed } from 'vue';
import { getIcon } from '../utils';
import type { ButtonViewReturnComponentProps, IconOptions } from '../types';

interface Props {
  icon?: IconOptions;
  tooltip?: string;
  isDisabled?: ButtonViewReturnComponentProps['isDisabled'];
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

const btnIcon = computed(() => getIcon(props.icon));
</script>

<template>
  <v-btn
    class="rounded me-1 ms-0"
    density="comfortable"
    size="small"
    :disabled="isDisabled"
    :color="color"
    icon
    :class="{
      'v-btn--active': isActive?.()
    }"
    @click="action"
  >
    <v-icon v-if="btnIcon" :icon="btnIcon" />

    <v-tooltip
      v-if="tooltip"
      class="compact"
      open-delay="150"
      activator="parent"
      location="top"
      :text="props.tooltip"
    />
    <slot></slot>
  </v-btn>
</template>
