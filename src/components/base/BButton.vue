<script lang="ts" setup>
type Props = {
  type?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
};

const props = defineProps<Props>();
</script>
<template>
  <v-btn v-bind="$attrs" @click="($event: MouseEvent) => $emit('click', $event)">
    <!-- pass through normal slots -->
    <template v-for="slot in $slots" :key="slot.name">
      <slot v-bind="slot" />
    </template>
  </v-btn>
</template>
<style lang="scss" scoped></style>
