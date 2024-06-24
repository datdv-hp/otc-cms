import { DEFAULT_PAGE } from '@/common/constants/common.constant';
import { awardSettingServiceApi } from '../api';
import { toAwardSettingList } from '../helper';
import { IAwardSetting, IAwardSettingQueryParams } from '../type';

export const UseAwardSettingStore = defineStore('award-setting', () => {
  const list = ref<IAwardSetting[]>([]);
  const totalItems = shallowRef(0);
  const lastPage = shallowRef(DEFAULT_PAGE);
  const isLoadingList = shallowRef(false);
  const queryParams = ref<IAwardSettingQueryParams>({});
  const selectedId = ref<number | null>(null);

  function setList(data: IAwardSetting[]) {
    list.value = data;
  }
  function setIsLoadingList(value: boolean) {
    isLoadingList.value = value;
  }
  function setQueryParams(value?: IAwardSettingQueryParams) {
    queryParams.value = value ?? {};
  }
  function patchQueryParams(value: Partial<IAwardSettingQueryParams>) {
    queryParams.value = {
      ...queryParams.value,
      ...value
    };
  }
  function setTotalItems(value: number) {
    totalItems.value = value;
  }
  function setLastPage(value: number) {
    lastPage.value = value;
  }
  function setSelectedId(value: number | null) {
    selectedId.value = value;
  }

  async function getList(query = queryParams.value) {
    setIsLoadingList(true);
    const response = await awardSettingServiceApi.getAwardSettingList(query);
    setIsLoadingList(false);
    if (response.success) {
      setList(toAwardSettingList(response?.data?.data));
      setTotalItems(response?.data?.total || 0);
      setLastPage(response?.data?.last_page || DEFAULT_PAGE);
    }
    return response;
  }

  return {
    list,
    isLoadingList,
    selectedId,
    setSelectedId,
    setList,
    setIsLoadingList,
    setQueryParams,
    patchQueryParams,
    getList
  };
});
