import { IQueryParams } from '@/common/type';
import { UserStatus } from '../constant';

export type IUserQueryParamsDTO = IQueryParams & {
  parent_id?: number | string;
};

export type IUpdateUserStatusParamsDTO = {
  status: UserStatus;
};
