import { IBodyResponse } from '@/common/type';
import { IUserProfile } from './types';
import { authApiService } from './api';

const STORE_NAME = 'auth';
export const UseAuthStore = defineStore(STORE_NAME, () => {
  const profile = ref<IUserProfile | null>();

  const setProfile = (user: IUserProfile | null) => {
    profile.value = user;
  };

  async function getProfile() {
    const res: IBodyResponse<IUserProfile> = await authApiService.getProfile();
    if (res.success) {
      setProfile(res.data);
    } else {
      setProfile(null);
    }
    return res;
  }

  return {
    profile,
    setProfile,
    getProfile
  };
});
