<script lang="ts" setup>
import { formatDate, notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { ChangePasswordSchema } from '../constant';
import { UseAuthStore } from '../store';
import { IProfileForm } from '../types';
import { authApiService } from '../api';

const store = UseAuthStore();
const { t } = useI18n();

/** Handle form  */
const { errors, handleSubmit, isSubmitting, resetForm } = useForm<IProfileForm>({
  validationSchema: ChangePasswordSchema
});
const { value: password } = useField<string>('password');
const { value: newPassword } = useField<string>('newPassword');
const { value: confirmPassword } = useField<string>('confirmPassword');

const submit = handleSubmit(async (values) => {
  const res = await authApiService.changePassword({
    password: values.password,
    newPassword: values.newPassword
  });
  if (res.success) {
    resetForm({ values: {} });
    notifySuccess(t('auth.success.changePassword'));
  } else {
    notifyError(t('common.error.somethingWrong'));
  }
});
</script>
<template>
  <v-card class="card-wrapper pa-6" :elevation="0">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <DefaultAvatar class="avatar cursor-pointer" />
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-row>
          <v-col cols="12" class="profile_wrapper">
            <div class="fullname">{{ store.profile?.fullname }}</div>
            <div class="username">@{{ store.profile?.username }}</div>
            <div class="createdAt">
              <span class="label">{{ $t('auth.profile.joinDate') }}</span>
              <span class="value">{{
                store.profile?.created_at && formatDate(store.profile?.created_at)
              }}</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-divider class="mt-6"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :error="!!errors.password"
              :error-messages="translateYupError(errors.password)"
              :label="$t('auth.changePassword.currentPassword')"
              :placeholder="$t('auth.fields.password')"
              type="password"
              autocomplete="false"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="newPassword"
              :error="!!errors.newPassword"
              :error-messages="translateYupError(errors.newPassword)"
              :label="$t('auth.changePassword.newPassword')"
              :placeholder="$t('auth.fields.password')"
              type="password"
              autocomplete="false"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              :error="!!errors.confirmPassword"
              :error-messages="translateYupError(errors.confirmPassword)"
              :label="$t('auth.changePassword.confirmPassword')"
              :placeholder="$t('auth.fields.password')"
              type="password"
              autocomplete="false"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              color="primary"
              class="text-none mt-3"
              @click.stop="submit"
            >
              {{ $t('auth.changePassword.button') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<style lang="scss" scoped>
.avatar {
  font-size: 100px;
}
.profile_wrapper {
  display: flex;
  flex-flow: column;

  .fullname {
    font-size: 32px;
    font-weight: 700;
  }
  .username {
    font-size: 18px;
    color: $color-neutral-4;
  }
  .createdAt {
    display: flex;
    gap: 4px;
    margin-top: 12px;
    color: $color-neutral-4;
    flex-wrap: wrap;
  }
}
</style>
