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
    <div class="search__wrapper">
      <v-text-field
        class="search"
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
      <v-btn
        icon="$common.search"
        rounded="lg"
        color="neutral"
        variant="outlined"
        height="44"
        width="44"
        min-height="44"
        @click="search"
      ></v-btn>
    </div>
    <div class="append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.filter-wrapper {
  padding: 12px;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.search__wrapper {
  display: flex;
  gap: 12px;
  .search {
    :deep(.v-field) {
      border-radius: 12px;
    }
  }
  :deep(.v-field--variant-solo) {
    background: $color-neutral-6;
  }
}
</style>
