import { IBodyResponse } from '@/common/type';
import { IUserProfile } from './types';

const STORE_NAME = 'auth';
export const UseAuthStore = defineStore(STORE_NAME, () => {
  const profile = ref<IUserProfile | null>();

  const setProfile = (user: IUserProfile | null) => {
    profile.value = user;
  };

  // TODO: implement getProfile
  async function getProfile() {
    const res: IBodyResponse<IUserProfile> = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNum = Math.random() * 20;
        const isSuccess = 5 < randomNum && randomNum < 13;
        if (isSuccess) {
          resolve({
            success: isSuccess,
            data: {
              id: Math.round(randomNum),
              fullname: 'fullname' + Math.round(randomNum),
              username: 'username' + Math.round(randomNum),
              permissions: []
            },
            message: 'signed in successfully'
          } as IBodyResponse<IUserProfile>);
        } else {
          resolve({
            success: isSuccess,
            message: 'Failed to get profile'
          } as IBodyResponse<IUserProfile>);
        }
      }, 1500);
    });
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
