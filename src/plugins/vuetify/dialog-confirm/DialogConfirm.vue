<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogConfirm',
  props: {
    type: String,
    message: Object,
    resolve: Function
  },
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    this.visible = true;
  },
  methods: {
    onClose() {
      this.visible = false;
      this.resolve?.(false);
    },
    onConfirm() {
      this.visible = false;
      this.resolve?.(true);
    }
  }
});
</script>

<template>
  <v-dialog v-model="visible" persistent width="auto" class="dialog-confirm">
    <v-card class="pa-6" min-width="300" max-width="600">
      <div class="d-flex justify-center align-center text-center">
        <v-card-title class="pa-0"> {{ message?.title }}</v-card-title>
      </div>

      <v-card-text class="text-center pt-0 my-4">
        <template v-if="message?.textComponent">
          <component :is="message.textComponent.component" v-bind="message.textComponent.props" />
        </template>
        <template v-else><span v-html="message?.text"></span></template>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="onClose"
          variant="outlined"
          color="neutral"
          min-with="fit-content"
          class="w-50"
        >
          {{ $t('common.button.cancel') }}
        </v-btn>
        <v-btn :color="type" @click="onConfirm" variant="flat" min-with="fit-content" class="w-50">
          {{ $t('common.button.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
