import { DEFAULT_PAGE } from '@/common/constants/common.constant';
import { userApiService } from './api';
import { IUserQueryParamsDTO } from './dto/request.user-dto';
import { toUserDetail, toUserList } from './helper';
import { IUserDetail, IUserListItem } from './type';

const STORE_NAME = 'user-store';
export const UseUserStore = defineStore(STORE_NAME, () => {
  const list = ref<IUserListItem[]>([]);
  const totalItems = shallowRef(0);
  const detail = ref<IUserDetail | null>(null);
  const lastPage = shallowRef(DEFAULT_PAGE);
  const queryParams = ref<IUserQueryParamsDTO>({});
  const isLoadingList = shallowRef(false);

  function setDetail(data: IUserDetail | null) {
    detail.value = data || null;
  }
  function setList(value: IUserListItem[]) {
    list.value = value;
  }
  function setIsLoadingList(value: boolean) {
    isLoadingList.value = value;
  }

  function setTotalItems(value: number) {
    totalItems.value = value;
  }
  function setQueryParams(value?: IUserQueryParamsDTO) {
    queryParams.value = value ?? {};
  }
  function patchQueryParams(value: Partial<IUserQueryParamsDTO>) {
    queryParams.value = {
      ...queryParams.value,
      ...value
    };
  }
  function setLastPage(value: number) {
    lastPage.value = value;
  }

  async function getList(query = queryParams.value) {
    setIsLoadingList(true);
    const res = await userApiService.getUserList(query);
    setIsLoadingList(false);

    if (res.success) {
      setList(toUserList(res.data.data));
      setTotalItems(res.data.total);
      setLastPage(res.data.last_page);
    }
    return res;
  }

  async function getDetail(id: number) {
    const res = await userApiService.getUser(id);
    if (res.success) {
      setDetail(toUserDetail(res.data));
    }
    return res;
  }

  return {
    detail,
    setDetail,
    getDetail,
    list,
    setList,
    totalItems,
    setTotalItems,
    queryParams,
    setQueryParams,
    patchQueryParams,
    lastPage,
    setLastPage,
    getList,
    isLoadingList,
    setIsLoadingList
  };
});
