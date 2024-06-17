<script lang="ts" setup>
const { t } = useI18n();
const filter = ref({
  keyword: ''
});
</script>
<template>
  <div class="filter-wrapper d-sm-flex">
    <v-text-field
      v-model="filter.keyword"
      hide-details
      max-width="300"
      :placeholder="t('common.button.search')"
      variant="outlined"
      density="compact"
      size=""
      color="primary"
    ></v-text-field>
    <v-btn class="text-none mt-2 mt-sm-0" flat color="primary" height="40" variant="flat">{{
      t('common.button.search')
    }}</v-btn>
  </div>
</template>
<style lang="scss" scoped>
.filter-wrapper {
  gap: 8px;
}
</style>
