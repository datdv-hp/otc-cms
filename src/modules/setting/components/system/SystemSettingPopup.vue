<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { systemSettingServiceApi } from '../../api';
import { CashbackSettingFormSchema, SystemSettingType } from '../../constant';
import { UseSystemSettingStore } from '../../stores/system.setting.store';
import { cloneDeep } from 'lodash';

const { t } = useI18n();
const store = UseSystemSettingStore();

const isUpdate = computed(() => !!store.dialog?.currentId);
const title = computed(() =>
  isUpdate.value ? t('setting.system.title.update') : t('setting.system.title.create')
);
const initForm = { value: undefined };
const { errors, handleSubmit, isSubmitting, resetForm } = useForm<{ value: any }>({
  validationSchema: CashbackSettingFormSchema
});
const { value: value } = useField<any>('value');
async function fetchSystemSetting() {
  try {
    store.setDialogLoading(true);
    if (store.dialog?.currentId) {
      resetForm({
        values: {
          value: store.dialog.formValue?.value
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
    notifySuccess(t('setting.SystemSetting.success.update'));
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
});
</script>
<template>
  <v-dialog :model-value="true" max-width="600" min-width="350px" persistent>
    <v-card class="py-2" prepend-icon="$sidebar.setting" :title="title">
      <v-card-text>
        <v-row dense>
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
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-6">
        <v-spacer></v-spacer>
        <v-btn
          width="90"
          :text="t('common.button.close')"
          variant="plain"
          color="neutral"
          @click="store.closeDialog"
        ></v-btn>
        <v-btn
          color="primary"
          width="90"
          :text="t('common.button.save')"
          variant="flat"
          :loading="isSubmitting"
          @click="submit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped></style>
