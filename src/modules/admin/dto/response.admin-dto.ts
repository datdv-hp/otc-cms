import { AccountStatus } from '../constant';

export type IResponseAdminDTO = {
  id: number;
  fullname: string;
  username: string;
  status: AccountStatus;
  created_at: Date;
};
