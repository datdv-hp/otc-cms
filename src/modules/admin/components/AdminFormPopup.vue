<script lang="ts" setup>
import { notifyError, translateYupError } from '@/common/helper';
import { adminApiService } from '../api';

const props = defineProps<{
  id?: string | number;
}>();
const isOpen = defineModel<boolean>({ required: true });
const loading = shallowRef(true);
const { t } = useI18n();

const title = computed(() => (props.id ? t('admin.title.edit') : t('admin.title.create')));

const { errors, handleSubmit, isSubmitting } = useForm();
const { value: fullname } = useField<string>('fullname');
const { value: username } = useField<string>('username');
useField<string>('password');
useField<string>('confirmPassword');

async function fetchAdmin() {
  try {
    if (props.id) {
      await adminApiService._getDetail(props.id);
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
  try {
    //
  } catch (error) {
    //
  }
});

onMounted(async () => {
  fetchAdmin();
});
</script>
<template>
  <v-dialog v-model="isOpen" max-width="600" min-width="350px">
    <v-card class="py-2" prepend-icon="$sidebar.user" :title="title" :loading="loading">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="fullname"
              :label="t('admin.fields.fullname') + '*'"
              hide-details="auto"
              :error="!!errors.fullname"
              :error-messages="translateYupError(errors.fullname)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="username"
              :label="t('admin.fields.username') + '*'"
              hide-details="auto"
              :error="!!errors.username"
              :error-messages="translateYupError(errors.username)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :label="t('admin.fields.password') + '*'"
              autocomplete="new-password"
              type="password"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :label="t('admin.fields.confirmPassword') + '*'"
              type="confirmPassword"
              hide-details="auto"
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
