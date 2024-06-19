<script lang="ts" setup>
import MiniLogoDark from '@/assets/images/mini-logo-dark.svg?component';
import MiniLogoLight from '@/assets/images/mini-logo-light.svg?component';
import { PageName } from '@/common/constants/common.constant';
import { notifyError, notifySuccess } from '@/common/helper';
import localStorageAuthService from '@/common/storages/authStorage';
import { logout } from '@/plugins/axios';
import { useTheme } from 'vuetify';
import { authApiService } from '../api';
import { SignInSchema } from '../constant';
import { UseAuthStore } from '../store';
import { ISignInBody } from '../types';

const theme = useTheme();
const { t } = useI18n();
const router = useRouter();
const overlay = shallowRef(true);
const authStore = UseAuthStore();

const Logo = computed(() => {
  return theme.name.value === 'dark' ? MiniLogoDark : MiniLogoLight;
});
const title = computed(() => t('auth.signIn.title'));

/** Handle form  */
const { meta, errors, handleSubmit, isSubmitting, isValidating } = useForm<ISignInBody>({
  validationSchema: SignInSchema
});
const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

function redirectIfNeed() {
  const redirectPath = sessionStorage.getItem('redirect') as string;
  if (redirectPath) {
    router.replace(redirectPath);
    sessionStorage.removeItem('redirect');
  } else {
    router.push({ name: PageName.HOME_PAGE });
  }
}

function hasToken() {
  return !!localStorageAuthService.getAccessToken();
}

const signIn = handleSubmit(async (values) => {
  const res = await authApiService.signIn(values);
  if (res.success) {
    localStorageAuthService.setAuthTokens(res.data);
    const profile = await fetchProfile();
    if (profile?.success) {
      notifySuccess(t('auth.success.signIn'));
    }
  }
});

async function fetchProfile() {
  const res = await authStore.getProfile();
  if (!res.success) {
    overlay.value = false;
    notifyError(t('auth.error.profile'));
    logout();
    return res;
  }
  redirectIfNeed();
}

function setup() {
  overlay.value = true;
  const token = hasToken();
  if (token) {
    fetchProfile();
    return;
  }
  overlay.value = false;
}

onMounted(() => {
  setup();
});
</script>
<template>
  <v-overlay scrim="background" v-model="overlay" :opacity="1" class="align-center justify-center">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-overlay>
  <div class="sign-in__wrapper">
    <div class="sign-in__container">
      <div class="logo-wrapper">
        <component :is="Logo" />
      </div>
      <div class="sign-in__title tp-h3">{{ title }}</div>
      <div class="sign-in__content">
        <BInputText
          class="mb-3"
          v-model="username"
          prepend-inner-icon="$common.email"
          :placeholder="t('auth.fields.username')"
          :error="errors.username"
          @keydown.enter="signIn"
        />
        <BInputText
          class="mb-4"
          v-model="password"
          type="password"
          prepend-inner-icon="$common.lock"
          :placeholder="t('auth.fields.password')"
          :error="errors.password"
          @keydown.enter="signIn"
        />
        <v-btn
          :disabled="!meta.valid"
          class="sign-btn tp-button-1"
          :text="t('auth.signIn.title')"
          color="primary"
          variant="flat"
          height="48"
          :loading="isValidating || isSubmitting"
          @click="signIn"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sign-in__wrapper {
  height: 100%;
  padding: auto 39.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
}
.logo-wrapper {
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  .logo-text {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0.25em;
  }
}

.sign-in__title {
  margin-bottom: 32px;
}
.sign-in__content {
  width: 296px;
}
.sign-btn {
  width: 100%;
  border-radius: 12px;
  text-transform: none;
}
</style>
