<script lang="ts" setup>
type Props = {
  title: string;
  value?: any;
  href?: string;
};
defineProps<Props>();
</script>
<template>
  <div class="item__wrapper">
    <span class="item__title flex-1">{{ title }}</span>
    <a class="link-text-highlight item__value flex-1" v-if="href" :href="href" target="_blank">{{
      value
    }}</a>
    <span class="item__value flex-1" v-else>{{ value }}</span>
  </div>
</template>
<style lang="scss" scoped>
.item__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 4px;
  .item__title {
    flex-basis: 200px !important;
    opacity: 0.9;
  }
  .item__value {
    font-size: 1.2em;
    flex-basis: 200px;
    font-weight: 600;
  }
}
</style>
