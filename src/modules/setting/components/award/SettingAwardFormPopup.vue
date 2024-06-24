<script lang="ts" setup>
import { notifyError, translateYupError } from '@/common/helper';
import { awardSettingServiceApi } from '../../api';
import { UseAwardSettingStore } from '../../stores/award-setting.store';
import { toAwardSettingDetail } from '../../helper';

const isOpen = defineModel<boolean>({ required: true });
const loading = shallowRef(true);
const { t } = useI18n();
const store = UseAwardSettingStore();

const title = computed(() =>
  store.selectedId ? t('setting.award.title.update') : t('setting.award.title.create')
);

/** Form */
const { errors, handleSubmit, isSubmitting, resetForm } = useForm();
const { value: name } = useField<string>('name');
const { value: stepValue } = useField<string>('stepValue');
const { value: icon } = useField<string>('icon');
const { value: description } = useField<string>('description');

/** Get detail */
async function getAward() {
  try {
    if (!store.selectedId) return;
    const res = await awardSettingServiceApi._getDetail<Record<string, unknown>>(store.selectedId);
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

function closeDialog() {
  isOpen.value = false;
}

const submit = handleSubmit(async () => {
  // TODO: Implement submit logic
});

onMounted(() => {
  getAward();
});
</script>
<template>
  <v-dialog v-model="isOpen" max-width="600" min-width="350px">
    <v-card class="py-2" prepend-icon="$sidebar.award" :title="title" :loading="loading">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :label="t('setting.award.fields.name') + '*'"
              hide-details="auto"
              :error="!!errors.name"
              :error-messages="translateYupError(errors.name)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="stepValue"
              :label="t('setting.award.fields.stepValue') + '*'"
              hide-details="auto"
              :error="!!errors.stepValue"
              :error-messages="translateYupError(errors.stepValue)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="icon"
              :label="t('setting.award.fields.icon')"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="description"
              :label="t('setting.award.fields.description')"
              hide-details="auto"
              :error="!!errors.description"
              :error-messages="translateYupError(errors.description)"
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
          @click="closeDialog"
        ></v-btn>
        <v-btn
          color="primary"
          width="90"
          :text="t('common.button.save')"
          variant="tonal"
          :loading="isSubmitting"
          @click="submit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped></style>
