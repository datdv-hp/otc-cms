<script lang="ts" setup>
import { IActionOption } from '@/common/type';
import { throttle } from 'lodash';
import { VBtn } from 'vuetify/components/VBtn';
type Props = {
  tooltip?: string;
  icon?: string;
  text?: string;
  color?: string;
  variant?: 'text' | 'plain' | 'tonal' | 'outlined' | 'flat' | 'elevated';
  options?: IActionOption[];
  loading?: boolean;
};
type Emits = {
  (event: 'click', $event: MouseEvent): void;
};
const emits = defineEmits<Emits>();
withDefaults(defineProps<Props>(), {
  tooltip: '',
  variant: 'text'
});

const handleClick = throttle(($event: MouseEvent) => {
  emits('click', $event);
}, 500);
const btnRef = ref<VBtn | null>(null);
const selectedModel = defineModel('selected');
</script>
<template>
  <v-tooltip
    :activator="btnRef?.$el"
    :text="tooltip"
    v-if="tooltip"
    open-delay="200"
    location="top center"
    density="compact"
    :offset="-4"
    class="compact-tooltip"
  />
  <v-menu :activator="btnRef?.$el" v-if="options?.length">
    <v-list v-model:selected="selectedModel" density="compact" color="primary">
      <v-list-item
        v-for="(item, index) in options"
        :key="index"
        :title="item.title"
        :disabled="item.disabled"
        @click="item.action"
      ></v-list-item>
    </v-list>
  </v-menu>
  <v-btn
    ref="btnRef"
    class="text-none"
    density="comfortable"
    :variant="variant"
    :color="color"
    :icon="icon"
    :text="text"
    :loading="loading"
    @click="handleClick"
  />
</template>
<style lang="scss" scoped></style>
