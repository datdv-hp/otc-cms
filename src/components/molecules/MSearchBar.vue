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
      class="search"
      v-model="keyword"
      hide-details
      max-width="400"
      min-width="200"
      :placeholder="$t('common.button.search')"
      variant="solo"
      :disabled="loading"
      density="compact"
      color="primary"
      append-inner-icon="$common.search"
      @keydown.enter="search"
      @click:append-inner="search"
    />
    <slot name="append"></slot>
  </div>
</template>
<style lang="scss" scoped>
.filter-wrapper {
  padding-top: 8px;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
}
.search {
  :deep(.v-field) {
    border-radius: 12px;
  }
  :deep(.v-field--variant-solo) {
    background: $color-neutral-6;
  }
}
</style>
