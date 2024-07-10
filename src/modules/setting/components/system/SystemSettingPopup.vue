<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import TiptapEditor from '@/components/tiptap-editor/TiptapEditor.vue';
import { cloneDeep } from 'lodash';
import { systemSettingServiceApi } from '../../api';
import { SystemSettingFormSchema, SystemSettingType } from '../../constant';
import { UseSystemSettingStore } from '../../stores/system.setting.store';
import dayjs from '@/plugins/dayjs';

const { t } = useI18n();
const store = UseSystemSettingStore();

const initForm = { valueVi: undefined, valueEn: undefined };
const { errors, handleSubmit, isSubmitting, resetForm } = useForm<{ valueVi: any; valueEn: any }>({
  validationSchema: SystemSettingFormSchema
});
const { value: valueVi, setValue: setValueVi } = useField<any>('valueVi');
const { value: valueEn, setValue: setValueEn } = useField<any>('valueEn');
async function fetchSystemSetting() {
  try {
    store.setDialogLoading(true);
    if (store.dialog?.currentId) {
      let valueVi = store.dialog?.formValue?.valueVi;
      let valueEn = store.dialog?.formValue?.valueEn;
      switch (store.dialog.formValue?.type) {
        case SystemSettingType.DATE: {
          const dateVi = store.dialog?.formValue?.valueVi;
          const dateEn = store.dialog?.formValue?.valueVi;
          valueVi = dateVi && dayjs(dateVi).isValid() ? dayjs(dateVi).toDate() : undefined;
          valueVi = dateEn && dayjs(dateEn).isValid() ? dayjs(dateEn).toDate() : undefined;
          break;
        }
        case SystemSettingType.FILE: {
          const fileURLVi = store.dialog?.formValue?.valueVi?.url;
          const fileURLEn = store.dialog?.formValue?.valueEn?.url;
          valueVi = fileURLVi;
          valueEn = fileURLEn;
          break;
        }
        default:
          break;
      }
      resetForm({
        values: {
          valueVi,
          valueEn
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
    value_vi: values.valueVi,
    value_en: values.valueEn
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
          v-model="valueVi"
          :label="store.dialog?.formValue?.label + ' (VI)'"
          :placeholder="t('setting.system.placeholder.valueVi')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.valueVi"
          :error-messages="translateYupError(errors.valueVi)"
        />
        <v-text-field
          v-if="store.dialog?.formValue?.type === SystemSettingType.NUMBER"
          v-model="valueVi"
          type="number"
          :hide-spin-buttons="true"
          :label="store.dialog?.formValue?.label + '(VI)'"
          :placeholder="t('setting.system.placeholder.valueVi')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.valueVi"
          :error-messages="translateYupError(errors.valueVi)"
        />
        <v-textarea
          v-if="store.dialog?.formValue?.type === SystemSettingType.TEXTAREA"
          v-model="valueVi"
          :label="store.dialog?.formValue?.label + '(VI)'"
          :placeholder="t('setting.system.placeholder.valueVi')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.valueVi"
          :error-messages="translateYupError(errors.valueVi)"
        />
        <TiptapEditor
          v-if="store.dialog?.formValue?.type === SystemSettingType.EDITOR"
          :label="store.dialog?.formValue?.label + '(VI)'"
          :placeholder="t('setting.system.placeholder.valueVi')"
          :model-value="valueVi"
          @update:model-value="setValueVi"
          :errorMessage="errors.valueVi"
        ></TiptapEditor>
        <v-date-picker
          v-if="store.dialog?.formValue?.type === SystemSettingType.DATE"
          :title="store.dialog?.formValue?.label + '(VI)'"
          color="primary"
          bg-color="transparent"
          v-model="valueVi"
          :border="'sm'"
          width="100%"
          show-adjacent-months
        ></v-date-picker>
        <BFileUpload
          v-if="store.dialog?.formValue?.type === SystemSettingType.FILE"
          v-model="valueVi"
          :height="200"
          :choose-text="$t('common.button.chooseFile') + '(VI)'"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-if="store.dialog?.formValue?.type === SystemSettingType.TEXT"
          v-model="valueEn"
          :label="store.dialog?.formValue?.label + ' (EN)'"
          :placeholder="t('setting.system.placeholder.valueEn')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.valueEn"
          :error-messages="translateYupError(errors.valueEn)"
        />
        <v-text-field
          v-if="store.dialog?.formValue?.type === SystemSettingType.NUMBER"
          v-model="valueEn"
          type="number"
          :hide-spin-buttons="true"
          :label="store.dialog?.formValue?.label + ' (EN)'"
          :placeholder="t('setting.system.placeholder.valueEn')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.valueEn"
          :error-messages="translateYupError(errors.valueEn)"
        />
        <v-textarea
          v-if="store.dialog?.formValue?.type === SystemSettingType.TEXTAREA"
          v-model="valueEn"
          :label="store.dialog?.formValue?.label + ' (EN)'"
          :placeholder="t('setting.system.placeholder.valueEn')"
          auto-focus
          :loading="!!store.dialog?.isLoading"
          :disabled="!!store.dialog?.isLoading"
          :error="!!errors.valueEn"
          :error-messages="translateYupError(errors.valueEn)"
        />
        <TiptapEditor
          v-if="store.dialog?.formValue?.type === SystemSettingType.EDITOR"
          :label="store.dialog?.formValue?.label + ' (EN)'"
          :placeholder="t('setting.system.placeholder.valueEn')"
          :model-value="valueEn"
          @update:model-value="setValueEn"
          :errorMessage="errors.valueEn"
        ></TiptapEditor>
        <v-date-picker
          v-if="store.dialog?.formValue?.type === SystemSettingType.DATE"
          :title="store.dialog?.formValue?.label + ' (EN)'"
          color="primary"
          bg-color="transparent"
          v-model="valueEn"
          :border="'sm'"
          width="100%"
          show-adjacent-months
        ></v-date-picker>
        <BFileUpload
          v-if="store.dialog?.formValue?.type === SystemSettingType.FILE"
          v-model="valueEn"
          :height="200"
          :choose-text="$t('common.button.chooseFile') + ' (EN)'"
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
    background-color: hsl(224, 62%, 5%);
  }
  .v-date-picker-header {
    background-color: hsl(224, 62%, 5%) !important;
  }
  .v-date-picker-controls__month-btn .v-btn__content {
    text-transform: capitalize;
  }
}
</style>
