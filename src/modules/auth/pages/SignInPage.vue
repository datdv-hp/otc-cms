<script lang="ts" setup>
import LogoImage from '@/assets/images/logo.png';
import { PageName } from '@/common/constants/common.constant';
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import localStorageAuthService from '@/common/storages/authStorage';
import { logout } from '@/plugins/axios';
import { authApiService } from '../api';
import { SignInSchema } from '../constant';
import { UseAuthStore } from '../store';
import { ISignInBody } from '../types';
import HttpStatus from '@/common/constants/http.constant';

const { t } = useI18n();
const router = useRouter();
const overlay = shallowRef(true);
const authStore = UseAuthStore();

/** Handle form  */
const { meta, errors, handleSubmit, isSubmitting, isValidating } = useForm<ISignInBody>({
  validationSchema: SignInSchema
});
const { value: username } = useField<string>('username');
const { value: password, setErrors } = useField<string>('password');
const { value: remember } = useField<boolean>('remember');

function redirectIfNeed() {
  const redirectPath = sessionStorage.getItem('redirect') as string;
  if (redirectPath) {
    router.replace(redirectPath);
    sessionStorage.removeItem('redirect');
  } else {
    router.push({ name: PageName.USER_LIST_PAGE });
  }
}

function hasToken() {
  return !!localStorageAuthService.getAccessToken();
}

const signIn = handleSubmit(async (values) => {
  const res = await authApiService.signIn(values);
  if (res.success) {
    localStorageAuthService.setAuthTokens(res.data);
    await fetchProfile().then((res) => {
      if (res.success) {
        notifySuccess(t('auth.success.signIn'));
        redirectIfNeed();
      }
    });
  } else {
    if (res.status === HttpStatus.UNAUTHORIZED) {
      setErrors(t('auth.error.invalidCredentials'));
    } else {
      notifyError(t('common.error.somethingWrong'));
    }
  }
});

async function fetchProfile() {
  const res = await authStore.getProfile();
  if (!res.success) {
    overlay.value = false;
    notifyError(t('auth.error.profile'));
    logout();
  }
  return res;
}

function setup() {
  overlay.value = true;
  const token = hasToken();
  if (token) {
    fetchProfile().then((res) => {
      if (res?.success) {
        redirectIfNeed();
      }
    });

    return;
  }
  overlay.value = false;
}

onMounted(() => {
  setup();
});
const isPasswordVisible = ref(false);
</script>
<template>
  <v-overlay
    scrim="background"
    v-model="overlay"
    persistent
    :opacity="1"
    class="align-center justify-center"
  >
    <v-progress-circular indeterminate></v-progress-circular>
  </v-overlay>
  <div class="sign-in__wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7 pb-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <v-img class="my-n3" :src="LogoImage" :width="90" />
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">{{ t('auth.signIn.welcome') }}</h5>
        <p class="mb-0">{{ t('auth.signIn.pleaseSignIn') }}</p>
      </VCardText>

      <VCardText>
        <VRow>
          <!-- email -->
          <VCol cols="12">
            <VTextField
              v-model="username"
              autofocus
              autocomplete="false"
              :placeholder="t('auth.fields.username')"
              label="Username"
              :error="!!errors.username"
              :error-messages="translateYupError(errors.username)"
              @keydown.enter="signIn"
            />
          </VCol>

          <!-- password -->
          <VCol cols="12">
            <VTextField
              v-model="password"
              label="Password"
              autocomplete="false"
              :placeholder="t('auth.fields.password')"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? '$common.eye' : '$common.eye'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              :error="!!errors.password"
              :error-messages="translateYupError(errors.password)"
              @keydown.enter="signIn"
            />

            <!-- remember me checkbox -->
            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
              <VCheckbox v-model="remember" label="Remember me" />

              <RouterLink class="text-primary ms-2 mb-1" to="#"> Forgot Password? </RouterLink>
            </div>

            <!-- login button -->
            <VBtn
              block
              type="submit"
              :disabled="!meta.valid"
              :loading="isValidating || isSubmitting"
              @click="signIn"
              color="primary"
            >
              {{ t('auth.signIn.title') }}
              <template #loader> <span class="loader"></span></template>
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>
<style lang="scss" scoped>
.sign-in__wrapper {
  height: 100%;
  background-image: url('/src/assets/images/wallpaper.png');
  min-height: 100vh;
  background-size: cover;
  padding: auto 39.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;

  .auth-card {
    background-color: rgba($color-neutral-5, 0.4);
    backdrop-filter: blur(10px);
    --webkit-backdrop-filter: blur(10px);
  }
}

.loader {
  width: 30px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 1s infinite linear;
}

:deep(.v-field) {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
  }
}
@keyframes l3 {
  20% {
    background-position:
      0% 0%,
      50% 50%,
      100% 50%;
  }
  40% {
    background-position:
      0% 100%,
      50% 0%,
      100% 50%;
  }
  60% {
    background-position:
      0% 50%,
      50% 100%,
      100% 0%;
  }
  80% {
    background-position:
      0% 50%,
      50% 50%,
      100% 100%;
  }
}
</style>
