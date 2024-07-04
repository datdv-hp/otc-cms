import { IQueryParams } from '@/common/type';

export type IAdminListQueryParams = IQueryParams;

export type IRequestCreateAdminFormDTO = {
  username: string;
  fullname: string;
  password: string;
};

export type IRequestUpdateAdminFormDTO = Partial<IRequestCreateAdminFormDTO>;
