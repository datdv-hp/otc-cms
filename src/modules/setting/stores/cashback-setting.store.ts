import { DEFAULT_PAGE } from '@/common/constants/common.constant';
import { cashbackSettingServiceApi } from '../api';
import { toCashbackSettingList } from '../helper';
import { ICashbackSetting, ICashbackSettingQueryParams } from '../type';
import { cloneDeep } from 'lodash';

const initDialog = {
  isShow: false,
  currentId: null,
  isLoading: false
};
export const UseCashbackSettingStore = defineStore('cashback-setting', () => {
  const list = ref<ICashbackSetting[]>([]);
  const totalItems = shallowRef(0);
  const lastPage = shallowRef(DEFAULT_PAGE);
  const isLoadingList = shallowRef(false);
  const queryParams = ref<ICashbackSettingQueryParams>({});

  const dialog = ref<{
    isShow: boolean;
    currentId?: string | number | null;
    isLoading?: boolean;
  }>(cloneDeep(initDialog));

  function setList(data: ICashbackSetting[]) {
    list.value = data;
  }
  function setIsLoadingList(value: boolean) {
    isLoadingList.value = value;
  }
  function setQueryParams(value?: ICashbackSettingQueryParams) {
    queryParams.value = value ?? {};
  }
  function patchQueryParams(value: Partial<ICashbackSettingQueryParams>) {
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
  function openDialog(id: number | null | string = null) {
    dialog.value.isShow = true;
    dialog.value.currentId = id;
  }
  function closeDialog() {
    dialog.value.isShow = false;
    dialog.value.currentId = null;
  }
  function setDialogLoading(value: boolean) {
    dialog.value.isLoading = value;
  }
  function resetDialog() {
    dialog.value = cloneDeep(initDialog);
  }

  async function getList(query = queryParams.value) {
    setIsLoadingList(true);
    const response = await cashbackSettingServiceApi.getCashbackSettingList(query);
    setIsLoadingList(false);
    if (response.success) {
      setList(toCashbackSettingList(response?.data?.data));
      setTotalItems(response?.data?.total || 0);
      setLastPage(response?.data?.last_page || DEFAULT_PAGE);
    }
    return response;
  }

  return {
    list,
    isLoadingList,
    totalItems,
    lastPage,
    queryParams,
    setList,
    setIsLoadingList,
    setQueryParams,
    patchQueryParams,
    getList,
    dialog,
    openDialog,
    closeDialog,
    setDialogLoading,
    resetDialog
  };
});
