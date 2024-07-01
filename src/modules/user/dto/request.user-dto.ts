import { IQueryParams } from '@/common/type';
import { UserStatus } from '../constant';

export type IUserQueryParamsDTO = IQueryParams & {
  parent_id?: number | string;
};

export type IUpdateUserStatusParamsDTO = {
  status: UserStatus;
};

export type IUserTransactionQueryParamsDTO = IQueryParams;
export type IRequestUpdateUserRefundFormDTO = {
  chain_type: string;
  cashback_id: number;
}[];
