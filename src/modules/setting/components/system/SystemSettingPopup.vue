<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import TiptapEditor from '@/components/tiptap-editor/TiptapEditor.vue';
import { cloneDeep } from 'lodash';
import { systemSettingServiceApi } from '../../api';
import { SystemSettingType } from '../../constant';
import { UseSystemSettingStore } from '../../stores/system.setting.store';
import dayjs from '@/plugins/dayjs';

const { t } = useI18n();
const store = UseSystemSettingStore();

const initForm = { value: undefined };
const { errors, handleSubmit, isSubmitting, resetForm } = useForm<{ value: any }>({});
const { value: value, setValue } = useField<any>('value');
async function fetchSystemSetting() {
  try {
    store.setDialogLoading(true);
    if (store.dialog?.currentId) {
      let value = store.dialog?.formValue?.value;
      switch (store.dialog.formValue?.type) {
        case SystemSettingType.DATE: {
          const date = store.dialog?.formValue?.value;
          value = date && dayjs(date).isValid() ? dayjs(date).toDate() : undefined;
          break;
        }
        case SystemSettingType.FILE: {
          const fileURL = store.dialog?.formValue?.value?.url;
          value = fileURL;
          break;
        }
        default:
          break;
      }
      resetForm({
        values: {
          value: value
        }
      });
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    store.setDialogLoading(false);
  }
}
const submit = handleSubmit(async (values) => {
  const res = await systemSettingServiceApi.updateSystemSetting(store.dialog?.currentId as string, {
    type: store.dialog?.formValue?.type as SystemSettingType,
    value: values.value
  });
  if (res.success) {
    notifySuccess(t('setting.system.success.update'));
    store.getList();
    store.closeDialog();
  } else {
    notifyError(t('common.error.somethingWrong'));
  }
});
onMounted(() => {
  fetchSystemSetting();
});
onUnmounted(() => {
  resetForm({ values: cloneDeep(initForm) });
  store.resetDialog();
});
</script>
<template>
  <BDialog
    :title="t('setting.system.title.update')"
    prepend-icon="$sidebar.setting"
    @close="store.closeDialog"
    @submit="submit"
    :submitting="isSubmitting"
  >
    <v-skeleton-loader v-if="store.dialog.isLoading" :type="`list-item@4`"></v-skeleton-loader>

    <v-row v-else>
      <v-col cols="12">
        <v-text-field
          v-if="store.dialog?.formValue?.type === SystemSettingType.TEXT"
          v-model="value"
          :label="store.dialog?.formValue?.label"
          :placeholder="t('setting.system.placeholder.value')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.value"
          :error-messages="translateYupError(errors.value)"
        />
        <v-text-field
          v-if="store.dialog?.formValue?.type === SystemSettingType.NUMBER"
          v-model="value"
          type="number"
          :hide-spin-buttons="true"
          :label="store.dialog?.formValue?.label"
          :placeholder="t('setting.system.placeholder.value')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.value"
          :error-messages="translateYupError(errors.value)"
        />
        <v-textarea
          v-if="store.dialog?.formValue?.type === SystemSettingType.TEXTAREA"
          v-model="value"
          :label="store.dialog?.formValue?.label"
          :placeholder="t('setting.system.placeholder.value')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.value"
          :error-messages="translateYupError(errors.value)"
        />
        <TiptapEditor
          v-if="store.dialog?.formValue?.type === SystemSettingType.EDITOR"
          :label="store.dialog?.formValue?.label"
          :placeholder="t('setting.system.placeholder.value')"
          :model-value="value"
          @update:model-value="setValue"
          :errorMessage="errors.value"
        ></TiptapEditor>
        <v-date-picker
          v-if="store.dialog?.formValue?.type === SystemSettingType.DATE"
          :title="store.dialog?.formValue?.label"
          color="primary"
          bg-color="transparent"
          v-model="value"
          :border="'sm'"
          width="100%"
          show-adjacent-months
        ></v-date-picker>
        <BFileUpload
          v-if="store.dialog?.formValue?.type === SystemSettingType.FILE"
          v-model="value"
          :height="200"
          :choose-text="$t('common.button.chooseFile')"
        />
      </v-col>
    </v-row>
  </BDialog>
</template>
<style lang="scss" scoped>
:deep(.v-date-picker) {
  .v-picker-title {
    text-transform: none;
    letter-spacing: 0.01em;
    font-size: 1.2em;
    border-bottom: 1px solid $color-neutral-6;
    background-color: $color-neutral-7;
  }
  .v-date-picker-header {
    background-color: $color-neutral-7 !important;
  }
  .v-date-picker-controls__month-btn .v-btn__content {
    text-transform: capitalize;
  }
}
</style>
