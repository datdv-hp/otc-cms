<script lang="ts" setup>
type Props = {
  loading?: boolean;
  hideSearchButton?: boolean;
};
type Emits = {
  (event: 'search', keyword?: string): void;
};
const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  hideSearchButton: true
});

const keyword = defineModel<string>('keyword', { required: false });
function search() {
  if (props.loading) return;
  emits('search', keyword.value);
}
</script>
<template>
  <div class="filter-wrapper">
    <v-text-field
      class="search flex-1-0"
      v-model="keyword"
      hide-details
      max-width="400"
      min-width="250"
      :placeholder="$t('common.button.search')"
      variant="solo"
      :disabled="loading"
      density="compact"
      color="primary"
      prepend-inner-icon="$common.search"
      @keydown.enter="search"
    />
    <div class="append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.filter-wrapper {
  padding: 12px;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.search {
  :deep(.v-field) {
    border-radius: 12px;
  }
}
:deep(.v-field--variant-solo) {
  background: $color-neutral-6;
}
</style>
