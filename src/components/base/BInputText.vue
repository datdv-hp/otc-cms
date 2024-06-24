<script lang="ts" setup>
import { translateYupError } from '@/common/helper';
type Props = {
  type?: 'text' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clearable?: boolean;
  prependInnerIcon?: string;
  appendInnerIcon?: string;
  hideSpinButtons?: boolean;
  hideDetails?: 'auto' | boolean;
  error?:
    | string
    | {
        i18nKey: string;
        params?: Record<string, string>;
      };
  loading?: boolean;
};
withDefaults(defineProps<Props>(), {
  type: 'text',
  hideDetails: 'auto'
});

const model = defineModel<string>();
</script>
<template>
  <v-text-field
    v-model="model"
    :type="type"
    :label="label"
    :prepend-inner-icon="prependInnerIcon"
    :append-inner-icon="appendInnerIcon"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :loading="loading"
    :clearable="clearable"
    :hide-details="hideDetails"
    :error="!!error"
    :error-messages="translateYupError(error)"
    flat
    color="primary"
    variant="outlined"
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
