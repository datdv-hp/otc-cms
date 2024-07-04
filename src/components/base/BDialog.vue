<script lang="ts" setup>
type Props = {
  title: string;
  submitting?: boolean;
  maxWidth?: number | string;
  minWidth?: number | string;
  prependIcon?: string;
};
type IEmits = {
  (event: 'close'): void;
  (event: 'submit'): void;
};
const emits = defineEmits<IEmits>();
withDefaults(defineProps<Props>(), {
  maxWidth: 600,
  minWidth: 350
});
function close() {
  emits('close');
}
function submit() {
  emits('submit');
}
</script>
<template>
  <v-dialog :model-value="true" :max-width="maxWidth" :min-width="minWidth" persistent>
    <v-card class="pa-4" :prepend-icon="prependIcon" :title="title">
      <v-card-text class="py-6">
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="px-6">
        <slot name="actions">
          <v-spacer></v-spacer>
          <v-btn
            width="90"
            :text="$t('common.button.close')"
            variant="plain"
            color="neutral"
            @click="close"
          ></v-btn>
          <v-btn
            color="primary"
            width="90"
            :text="$t('common.button.save')"
            variant="flat"
            :loading="submitting"
            @click="submit"
          ></v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped></style>
