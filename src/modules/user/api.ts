import { IQueryParams } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { IUser } from './type';

class UserApiService extends ApiService {
  getUserList(params: IQueryParams) {
    return this._getList<IUser>(params);
  }
}
export const userApiService = new UserApiService({ baseUrl: '/user' }, axiosInstance);
