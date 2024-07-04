<script setup lang="ts">
import yup from '@/plugins/yup';
import type { Editor } from '@tiptap/vue-3';
import { useForm } from 'vee-validate';
import { computed, watchEffect } from 'vue';
import { getIcon } from '../utils';

interface Props {
  value?: string;
  editor: Editor;
  destroy?: () => void;
}
interface Emits {
  (event: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  destroy: undefined
});
const emits = defineEmits<Emits>();
const {
  values: formValue,
  setValues: setForm,
  resetForm,
  meta
} = useForm<{ url?: string }>({
  validationSchema: {
    url: yup.string().required().url().label('tiptapEditorForm.linkDialog.url')
  }
});

const isDisabled = computed(() => {
  if (props.value === formValue.url) return true;
  if (!formValue.url || !meta.value.valid) return true;
  return false;
});

function apply() {
  if (formValue.url) {
    props.editor.chain().focus().extendMarkRange('link').setLink({ href: formValue.url }).run();
  }
  close();
}

function close() {
  emits('close');
  resetForm();
  setTimeout(() => props.destroy?.(), 300);
}

watchEffect(() => {
  if (props.value) {
    setForm({ url: props.value });
  }
});
</script>

<template>
  <v-dialog :model-value="true" max-width="400" activator="parent" @click:outside="close">
    <v-card>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-icon :icon="getIcon('close')" @click="close" />
      </div>

      <div>
        <InputText name="url" :label="$t('tiptapEditor.link.dialog.link')" />
      </div>
      <BaseButton
        class="mt-3"
        :is-disabled="isDisabled"
        size="extra-small"
        :label="$t('common.button.apply')"
        @click="apply"
      />
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped></style>
