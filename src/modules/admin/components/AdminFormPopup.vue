<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { adminApiService } from '../api';
import { AdminCreateFormSchema, AdminUpdateFormSchema } from '../constant';
import { toRequestCreateAdminFormDTO, toRequestUpdateAdminFormDTO } from '../helper';
import { UseAdminStore } from '../store';
import { IAdminForm } from '../type';

const loading = shallowRef(true);
const { t } = useI18n();
const store = UseAdminStore();
const showing = ref({ password: false, confirmPassword: false });
const title = computed(() =>
  store.dialog.adminId ? t('admin.title.update') : t('admin.title.create')
);
const isUpdate = computed(() => !!store.dialog?.adminId);

const { errors, handleSubmit, isSubmitting, resetForm } = useForm<IAdminForm>({
  validationSchema: isUpdate.value ? AdminUpdateFormSchema : AdminCreateFormSchema
});
const { value: fullname } = useField<string>('fullname');
const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');
const { value: confirmPassword } = useField<string>('confirmPassword');

async function fetchAdmin() {
  try {
    if (store.dialog.adminId) {
      const res = await adminApiService.getAdmin(store.dialog.adminId);
      resetForm({
        values: {
          fullname: res.data.fullname,
          username: res.data.username
        }
      });
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    loading.value = false;
  }
}

async function updateAdmin(form: IAdminForm) {
  const res = await adminApiService.updateAdmin(
    store.dialog?.adminId as number,
    toRequestUpdateAdminFormDTO(form)
  );
  if (res.success) {
    notifySuccess(t('admin.success.update'));
  }
  return res;
}
async function createAdmin(form: IAdminForm) {
  const res = await adminApiService.createAdmin(toRequestCreateAdminFormDTO(form));
  if (res.success) {
    notifySuccess(t('admin.success.create'));
  }
  return res;
}

const submit = handleSubmit(async (values) => {
  const res = isUpdate.value ? await updateAdmin(values) : await createAdmin(values);
  if (!res.success) {
    notifyError(t('common.error.somethingWrong'));
  } else {
    store.getList();
    store.closeDialog();
  }
});

onMounted(async () => {
  fetchAdmin();
});
</script>
<template>
  <BDialog
    :title="title"
    prepend-icon="$sidebar.admin"
    @close="store.closeDialog"
    @submit="submit"
    :submitting="isSubmitting"
  >
    <v-skeleton-loader v-if="loading" :type="`list-item@4`"></v-skeleton-loader>
    <v-row v-else>
      <v-col cols="12">
        <v-text-field
          v-model="fullname"
          :label="t('admin.fields.fullname') + '*'"
          :placeholder="t('admin.placeholder.fullname')"
          hide-details="auto"
          :error="!!errors.fullname"
          :error-messages="translateYupError(errors.fullname)"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="username"
          :label="t('admin.fields.username') + '*'"
          :placeholder="t('admin.placeholder.username')"
          hide-details="auto"
          :error="!!errors.username"
          :error-messages="translateYupError(errors.username)"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="password"
          :label="t('admin.fields.password') + (isUpdate && !password ? '' : '*')"
          autocomplete="new-password"
          :placeholder="t('auth.fields.password')"
          :type="showing.password ? 'text' : 'password'"
          hide-details="auto"
          :error="!!errors.password"
          :error-messages="translateYupError(errors.password)"
          :append-inner-icon="showing.password ? '$common.eye-slash' : '$common.eye'"
          @click:append-inner="showing.password = !showing.password"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="confirmPassword"
          :label="t('admin.fields.confirmPassword') + (isUpdate && !password ? '' : '*')"
          :placeholder="t('auth.fields.password')"
          autocomplete="off"
          :type="showing.confirmPassword ? 'text' : 'password'"
          hide-details="auto"
          :error="!!errors.confirmPassword"
          :error-messages="translateYupError(errors.confirmPassword)"
          :append-inner-icon="showing.confirmPassword ? '$common.eye-slash' : '$common.eye'"
          @click:append-inner="showing.confirmPassword = !showing.confirmPassword"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <small class="text-caption text-medium-emphasis">
          {{ t('common.indicateRequired') }}
        </small>
      </v-col>
    </v-row>
  </BDialog>
</template>
<style lang="scss" scoped></style>
