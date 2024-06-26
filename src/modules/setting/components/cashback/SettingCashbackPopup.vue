<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { cashbackSettingServiceApi } from '../../api';
import { CashbackSettingFormSchema } from '../../constant';
import { toCashbackSettingDetail, toRequestCreateCashbackDTO } from '../../helper';
import { UseCashbackSettingStore } from '../../stores/cashback-setting.store';
import { ICashbackForm } from '../../type';

const { t } = useI18n();
const store = UseCashbackSettingStore();
const isUpdate = computed(() => !!store.dialog?.currentId);
const title = computed(() =>
  isUpdate.value ? t('setting.cashback.title.update') : t('setting.cashback.title.create')
);
const initForm: Partial<ICashbackForm> = {
  name: undefined,
  percent: undefined
};

const { errors, handleSubmit, isSubmitting, resetForm } = useForm<ICashbackForm>({
  validationSchema: CashbackSettingFormSchema,
  initialValues: initForm
});
const { value: name } = useField<string>('name');
const { value: percent } = useField<number>('percent');

async function fetchCashback() {
  try {
    store.setDialogLoading(true);
    if (store.dialog?.currentId) {
      const res = await cashbackSettingServiceApi.getCashbackSetting(store.dialog?.currentId);
      if (res.success) {
        const detail = toCashbackSettingDetail(res.data);
        resetForm({
          values: {
            name: detail.name,
            percent: detail.percent
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
async function updateCashback(form: ICashbackForm) {
  const res = await cashbackSettingServiceApi.updateCashbackSetting(
    store.dialog?.currentId as string,
    toRequestCreateCashbackDTO(form)
  );
  if (res.success) {
    notifySuccess(t('setting.cashback.success.update'));
  }
  return res;
}
async function createCashback(form: ICashbackForm) {
  const res = await cashbackSettingServiceApi.createCashbackSetting(
    toRequestCreateCashbackDTO(form)
  );
  if (res.success) {
    notifySuccess(t('setting.cashback.success.create'));
  }
  return res;
}
const submit = handleSubmit(async (values) => {
  const res = isUpdate.value ? await updateCashback(values) : await createCashback(values);
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
    <v-card class="py-2" prepend-icon="$sidebar.cashback" :title="title">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :prepend="false"
              :label="t('setting.cashback.fields.name') + '*'"
              :placeholder="t('setting.cashback.placeholder.name')"
              auto-focus
              :loading="!!store.dialog?.isLoading"
              :disabled="!!store.dialog?.isLoading"
              :error="!!errors.name"
              :error-messages="translateYupError(errors.name)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="percent"
              :label="t('setting.cashback.fields.percent') + '*'"
              :placeholder="t('setting.cashback.placeholder.percent')"
              type="number"
              :loading="!!store.dialog?.isLoading"
              :disabled="!!store.dialog?.isLoading"
              hide-spin-buttons
              :error="!!errors.percent"
              :error-messages="translateYupError(errors.percent)"
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
