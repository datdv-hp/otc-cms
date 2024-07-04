import { cloneDeep } from 'lodash';
import { IAdmin } from './type';
import { IAdminListQueryParams } from './dto/request.admin-dto';
import { DEFAULT_PAGE } from '@/common/constants/common.constant';
import { toAdminList } from './helper';
import { adminApiService } from './api';

const STORE_NAME = 'admin-store';
const initAdminDialog: { isShow: boolean; isLoading: boolean; adminId?: number } = {
  isShow: false,
  isLoading: false,
  adminId: undefined
};
export const UseAdminStore = defineStore(STORE_NAME, () => {
  const dialog = ref(cloneDeep(initAdminDialog));
  const list = ref<IAdmin[]>([]);
  const totalItems = shallowRef(0);
  const lastPage = shallowRef(0);
  const isLoadingList = shallowRef(false);
  const queryParams = ref<IAdminListQueryParams>({});

  function openDialog(adminId?: number) {
    dialog.value.adminId = adminId;
    dialog.value.isShow = true;
  }
  function closeDialog() {
    dialog.value = cloneDeep(initAdminDialog);
  }
  function setIsLoadingDialog(value: boolean) {
    dialog.value.isLoading = value;
  }
  function setQueryParams(value?: IAdminListQueryParams) {
    queryParams.value = value ?? {};
  }
  function patchQueryParams(value: Partial<IAdminListQueryParams>) {
    queryParams.value = {
      ...queryParams.value,
      ...value
    };
  }
  function patchItemInList(index: number, item?: Partial<IAdmin>) {
    if (!item) {
      list.value.splice(index, 1);
      return;
    }
    Object.assign(list.value[index], item);
  }
  function setTotalItems(value: number) {
    totalItems.value = value;
  }
  function setLastPage(value: number) {
    lastPage.value = value;
  }
  function setIsLoadingList(value: boolean) {
    isLoadingList.value = value;
  }
  function setList(value: IAdmin[]) {
    list.value = value;
  }

  async function getList(query = queryParams.value) {
    setIsLoadingList(true);
    const response = await adminApiService.getAdminList(query);
    setIsLoadingList(false);
    if (response.success) {
      setList(toAdminList(response?.data?.data));
      setTotalItems(response?.data?.total || 0);
      setLastPage(response?.data?.last_page || DEFAULT_PAGE);
    }
    return response;
  }
  return {
    dialog,
    list,
    totalItems,
    isLoadingList,
    queryParams,
    openDialog,
    closeDialog,
    setIsLoadingDialog,
    patchItemInList,
    setLastPage,
    setQueryParams,
    patchQueryParams,
    getList
  };
});
