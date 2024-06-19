<script lang="ts" setup>
import { VBtn } from 'vuetify/components/VBtn';

type Props = {
  variant?: 'tonal' | 'flat' | 'outlined' | 'text';
  text?: string;
  icon?: string;
};

withDefaults(defineProps<Props>(), {
  variant: 'tonal',
  size: 'medium'
});
</script>
<template>
  <v-btn v-bind="$attrs" :text="text" :icon="icon"> </v-btn>
</template>
<style lang="scss" scoped></style>
