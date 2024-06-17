<script lang="ts" setup>
const filter = ref({
  keyword: ''
});
</script>
<template>
  <v-text-field
    v-model="filter.keyword"
    hide-details
    variant="outlined"
    color="primary"
  ></v-text-field>
</template>
<style lang="scss" scoped></style>
