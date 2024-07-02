import { DEFAULT_PAGE } from '@/common/constants/common.constant';
import { ISystemSetting, ISystemSettingQueryParams } from '../type';
import { cloneDeep } from 'lodash';
import { systemSettingServiceApi } from '../api';
import { toSystemSettingList } from '../helper';

const initDialog = {
  isShow: false,
  currentId: null,
  isLoading: false
};
export const UseSystemSettingStore = defineStore('system-setting', () => {
  const list = ref<ISystemSetting[]>([]);
  const totalItems = shallowRef(0);
  const lastPage = shallowRef(DEFAULT_PAGE);
  const isLoadingList = shallowRef(false);
  const queryParams = ref<ISystemSettingQueryParams>({});

  const dialog = ref<{
    isShow: boolean;
    currentId?: string | number | null;
    isLoading?: boolean;
  }>(cloneDeep(initDialog));

  function setList(data: ISystemSetting[]) {
    list.value = data;
  }
  function setIsLoadingList(value: boolean) {
    isLoadingList.value = value;
  }
  function setQueryParams(value?: ISystemSettingQueryParams) {
    queryParams.value = value ?? {};
  }
  function patchQueryParams(value: Partial<ISystemSettingQueryParams>) {
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
  function patchItemInList(index: number, item?: Partial<ISystemSetting>) {
    if (!item) {
      list.value.splice(index, 1);
      return;
    }
    Object.assign(list.value[index], item);
  }

  async function getList(query = queryParams.value) {
    setIsLoadingList(true);
    const response = await systemSettingServiceApi.getSystemSettingList(query);
    setIsLoadingList(false);
    if (response.success) {
      setList(toSystemSettingList(response?.data?.data));
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
    resetDialog,
    patchItemInList
  };
});
