import { AccountStatus } from './constant';

export type IAdmin = {
  id: number;
  fullname: string;
  username: string;
  status: AccountStatus;
  createdAt: Date | string;
};

export type ICreateAdminBody = {
  fullname: string;
  username: string;
  password: string;
};
