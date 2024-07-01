import { DEFAULT_PAGE } from '@/common/constants/common.constant';
import { userApiService } from './api';
import { UserStatus } from './constant';
import { IUserQueryParamsDTO, IUserTransactionQueryParamsDTO } from './dto/request.user-dto';
import { toUserRefundList, toUserDetail, toUserList, toUserTransactionList } from './helper';
import { IUserDetail, IUserListItem, IUserRefund, IUserTransaction } from './type';
import { cloneDeep } from 'lodash';

const STORE_NAME = 'user-store';
const initRefundDialog = { isShow: false, userId: NaN, isLoading: false };
export const UseUserStore = defineStore(STORE_NAME, () => {
  const list = ref<IUserListItem[]>([]);
  const totalItems = shallowRef(0);
  const detail = ref<IUserDetail | null>(null);
  const lastPage = shallowRef(DEFAULT_PAGE);
  const queryParams = ref<IUserQueryParamsDTO>({});
  const isLoadingList = shallowRef(false);

  /** transactions */
  const transactions = ref<IUserTransaction[]>([]);
  const transactionQueryParams = ref<IUserTransactionQueryParamsDTO>({});
  const isLoadingTransactions = shallowRef(false);
  const totalTransactions = shallowRef(0);
  const transactionLastPage = shallowRef(DEFAULT_PAGE);
  function setTransactions(value: IUserTransaction[]) {
    transactions.value = value;
  }
  function setTransactionQueryParams(value: IUserTransactionQueryParamsDTO) {
    transactionQueryParams.value = value;
  }
  function patchTransactionQueryParams(value: Partial<IUserTransactionQueryParamsDTO>) {
    transactionQueryParams.value = {
      ...transactionQueryParams.value,
      ...value
    };
  }
  function setIsLoadingTransactions(value: boolean) {
    isLoadingTransactions.value = value;
  }
  function setTotalTransactions(value: number) {
    totalTransactions.value = value;
  }
  function setTransactionLastPage(value: number) {
    transactionLastPage.value = value;
  }

  /** User refund */
  const userRefundMapByChainType = ref<Record<string, IUserRefund>>();
  const refundDialog = ref(cloneDeep(initRefundDialog));
  function setUserRefundMapByChainType(value: IUserRefund[]) {
    userRefundMapByChainType.value = Object.fromEntries(
      value.map((userRefund) => [userRefund.chainType, userRefund])
    );
  }
  function closeRefundDialog() {
    refundDialog.value.isShow = false;
    refundDialog.value = cloneDeep(initRefundDialog);
  }
  function openRefundDialog(userId: number) {
    refundDialog.value.isShow = true;
    refundDialog.value.userId = userId;
  }
  function setIsLoadingRefundDialog(value: boolean) {
    refundDialog.value.isLoading = value;
  }

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
  function patchUserStatusInList(index: number, status: UserStatus) {
    if (list.value[index]) {
      list.value[index].status = status;
    }
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

  async function getUserTransactions(userId: number, query = transactionQueryParams.value) {
    const res = await userApiService.getTransactionList(userId, query);
    if (res.success) {
      setTransactions(toUserTransactionList(res.data.data));
    }
    return res;
  }

  async function getUserRefund(userId: number) {
    const res = await userApiService.getRefundByUser(userId);
    if (res.success) {
      const userRefunds = toUserRefundList(res.data.data);
      setUserRefundMapByChainType(userRefunds);
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
    setIsLoadingList,
    patchUserStatusInList,

    setTransactions,
    setTransactionQueryParams,
    patchTransactionQueryParams,
    setIsLoadingTransactions,
    setTotalTransactions,
    setTransactionLastPage,
    getUserTransactions,
    transactions,
    transactionQueryParams,
    isLoadingTransactions,
    totalTransactions,
    transactionLastPage,

    userRefundMapByChainType,
    refundDialog,
    getUserRefund,
    setUserRefundMapByChainType,
    closeRefundDialog,
    openRefundDialog,
    setIsLoadingRefundDialog
  };
});
