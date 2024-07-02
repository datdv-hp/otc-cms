<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { systemSettingServiceApi } from '../../api';
import { CashbackSettingFormSchema } from '../../constant';
import {
  toRequestCreateSystemSettingFormDTO,
  toRequestUpdateSystemSettingFormDTO,
  toSystemSettingDetail
} from '../../helper';
import { UseSystemSettingStore } from '../../stores/system.setting.store';
import { ISystemSettingForm } from '../../type';

const { t } = useI18n();
const store = UseSystemSettingStore();
const isUpdate = computed(() => !!store.dialog?.currentId);
const title = computed(() =>
  isUpdate.value ? t('setting.system.title.update') : t('setting.system.title.create')
);
const initForm: Partial<ISystemSettingForm> = {
  key: undefined,
  value: undefined,
  label: undefined,
  type: undefined
};

const { errors, handleSubmit, isSubmitting, resetForm } = useForm<ISystemSettingForm>({
  validationSchema: CashbackSettingFormSchema,
  initialValues: initForm
});
const { value: key } = useField<string>('key');
// const { value: value } = useField<any>('value');
const { value: label } = useField<string>('label');
// const { value: type } = useField<SystemSettingType>('type');

async function fetchCashback() {
  try {
    store.setDialogLoading(true);
    if (store.dialog?.currentId) {
      const res = await systemSettingServiceApi.getSystemSetting(store.dialog?.currentId);
      if (res.success) {
        const detail = toSystemSettingDetail(res.data);
        resetForm({
          values: {
            key: detail.key,
            value: detail.value,
            label: detail.label,
            type: detail.type
          }
        });
      }
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    store.setDialogLoading(false);
  }
}
async function updateSystemSetting(form: ISystemSettingForm) {
  const res = await systemSettingServiceApi.updateSystemSetting(
    store.dialog?.currentId as string,
    toRequestUpdateSystemSettingFormDTO(form)
  );
  if (res.success) {
    notifySuccess(t('setting.SystemSetting.success.update'));
  }
  return res;
}
async function createSystemSetting(form: ISystemSettingForm) {
  const res = await systemSettingServiceApi.createSystemSetting(
    toRequestCreateSystemSettingFormDTO(form)
  );
  if (res.success) {
    notifySuccess(t('setting.cashback.success.create'));
  }
  return res;
}
const submit = handleSubmit(async (values) => {
  const res = isUpdate.value
    ? await updateSystemSetting(values)
    : await createSystemSetting(values);
  if (!res.success) {
    notifyError(t('common.error.somethingWrong'));
  } else {
    store.getList();
    store.closeDialog();
  }
});

watch(
  () => store.dialog.isShow,
  (value) => {
    if (value) {
      fetchCashback();
    } else {
      resetForm({ values: initForm });
      store.resetDialog();
    }
  }
);
</script>
<template>
  <v-dialog :model-value="store?.dialog?.isShow" max-width="600" min-width="350px" persistent>
    <v-card class="py-2" prepend-icon="$sidebar.setting" :title="title">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="label"
              :prepend="false"
              :label="t('setting.system.fields.label') + '*'"
              :placeholder="t('setting.system.placeholder.label')"
              auto-focus
              :loading="!!store.dialog?.isLoading"
              :disabled="!!store.dialog?.isLoading"
              :error="!!errors.label"
              :error-messages="translateYupError(errors.label)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="key"
              :prepend="false"
              :label="t('setting.system.fields.key') + '*'"
              :placeholder="t('setting.system.placeholder.key')"
              auto-focus
              :loading="!!store.dialog?.isLoading"
              :disabled="!!store.dialog?.isLoading"
              :error="!!errors.key"
              :error-messages="translateYupError(errors.key)"
            ></v-text-field>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis">{{ t('common.indicateRequired') }}</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-6">
        <v-spacer></v-spacer>
        <v-btn
          width="90"
          :text="t('common.button.close')"
          variant="plain"
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
