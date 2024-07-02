<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { awardSettingServiceApi } from '../../api';
import {
  toAwardSettingDetail,
  toRequestCreateAwardFormDTO,
  toRequestUpdateAwardFormDTO
} from '../../helper';
import { UseAwardSettingStore } from '../../stores/award-setting.store';
import { IAwardForm } from '../../type';
import { AwardSettingFormSchema } from '../../constant';

const loading = shallowRef(true);
const { t } = useI18n();
const store = UseAwardSettingStore();

const title = computed(() =>
  store.selectedId ? t('setting.award.title.update') : t('setting.award.title.create')
);
const isUpdate = computed(() => !!store?.dialog?.currentId);
const initForm: Partial<IAwardForm> = {
  name: undefined,
  icon: undefined,
  stepValue: undefined,
  description: undefined
};

/** Form */
const { errors, handleSubmit, isSubmitting, resetForm } = useForm<IAwardForm>({
  validationSchema: AwardSettingFormSchema
});
const { value: name } = useField<string>('name');
const { value: stepValue } = useField<number>('stepValue');
const { value: icon } = useField<string | null>('icon');
const { value: description } = useField<string>('description');

/** Get detail */
async function fetchAward() {
  try {
    if (!store.dialog?.currentId) return;
    const res = await awardSettingServiceApi.getAwardSetting(store.dialog.currentId);
    if (res.success) {
      const detail = toAwardSettingDetail(res.data);
      resetForm({
        values: {
          name: detail.name,
          stepValue: detail.stepValue,
          icon: detail.icon,
          description: detail.description
        }
      });
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    loading.value = false;
  }
}

async function updateAward(form: IAwardForm) {
  const res = await awardSettingServiceApi.updateAwardSetting(
    store.dialog?.currentId as string,
    await toRequestUpdateAwardFormDTO(form)
  );
  if (res.success) {
    notifySuccess(t('setting.award.success.update'));
  }
  return res;
}
async function createAward(form: IAwardForm) {
  const res = await awardSettingServiceApi.createAwardSetting(
    await toRequestCreateAwardFormDTO(form)
  );
  if (res.success) {
    notifySuccess(t('setting.award.success.create'));
  }
  return res;
}

const submit = handleSubmit(async (values) => {
  const res = isUpdate.value ? await updateAward(values) : await createAward(values);
  if (!res.success) {
    notifyError(t('common.error.somethingWrong'));
  } else {
    store.getList();
    store.closeDialog();
  }
});

const watchStop = watch(
  () => store.dialog.isShow,
  (value) => {
    if (value) {
      fetchAward();
    } else {
      resetForm({ values: initForm });
      store.resetDialog();
    }
  }
);

onUnmounted(() => {
  watchStop();
});
</script>
<template>
  <v-dialog :model-value="store?.dialog?.isShow" max-width="600" min-width="350px" persistent>
    <v-card class="py-2" prepend-icon="$sidebar.award" :title="title" :loading="loading">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :label="t('setting.award.fields.name') + '*'"
              :placeholder="t('setting.award.placeholder.name')"
              hide-details="auto"
              :error="!!errors.name"
              :error-messages="translateYupError(errors.name)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="stepValue"
              type="number"
              :hide-spin-buttons="true"
              :label="t('setting.award.fields.stepValue') + '*'"
              :placeholder="t('setting.award.placeholder.stepValue')"
              hide-details="auto"
              :error="!!errors.stepValue"
              :error-messages="translateYupError(errors.stepValue)"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="description"
              :label="t('setting.award.fields.description')"
              :placeholder="t('setting.award.placeholder.description')"
              hide-details="auto"
              :error="!!errors.description"
              :error-messages="translateYupError(errors.description)"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-label>{{ t('setting.award.fields.icon') }}</v-label>
            <BImageUpload class="image" v-model="icon" :height="200" />
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
          variant="outlined"
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
<style lang="scss" scoped>
.image {
  border: 1px solid red;
}
</style>
