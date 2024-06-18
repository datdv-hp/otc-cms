import { IUserDetail } from './type';

const STORE_NAME = 'user-store';
export const UseUserStore = defineStore(STORE_NAME, () => {
  const detail = ref<IUserDetail | null>(null);

  function setDetail(data: IUserDetail | null) {
    detail.value = data || null;
  }

  return {
    detail,
    setDetail
  };
});
