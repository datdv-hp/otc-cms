import { IUserProfile } from './types';

const STORE_NAME = 'auth';
export const authStore = defineStore(STORE_NAME, () => {
  const profile = ref<IUserProfile>();

  const setProfile = (user: IUserProfile) => {
    profile.value = user;
  };

  return {
    profile,
    setProfile
  };
});
