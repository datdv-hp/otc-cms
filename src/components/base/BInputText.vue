<script lang="ts" setup>
import { translateYupError } from '@/common/helper';
type Props = {
  value?: string;
  type?: 'text' | 'password';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clearable?: boolean;
  prependInnerIcon?: string;
  appendInnerIcon?: string;
  error?:
    | string
    | {
        i18nKey: string;
        params?: Record<string, string>;
      };
  loading?: boolean;
};
withDefaults(defineProps<Props>(), {
  type: 'text'
});

const model = defineModel<string>('modelValue');
</script>
<template>
  <v-text-field
    :type="type"
    v-model="model"
    :prepend-inner-icon="prependInnerIcon"
    :append-inner-icon="appendInnerIcon"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :loading="loading"
    :clearable="clearable"
    hide-details="auto"
    :error="!!error"
    :error-messages="translateYupError(error)"
    flat
    color="primary"
    variant="outlined"
    density="comfortable"
  >
    <template #label="{ props, label }" v-if="label">
      <v-label v-bind="props">
        <span>{{ label }}</span>
        <span class="required">*</span>
      </v-label>
    </template>
  </v-text-field>
</template>
<style lang="scss" scoped>
.required {
  color: $color-primary-3;
}
</style>
