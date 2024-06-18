import { IQueryParams } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { IUserListItem } from './type';

class UserApiService extends ApiService {
  getUserList(params: IQueryParams) {
    return this._getList<IUserListItem>(params);
  }
}
export const userApiService = new UserApiService({ baseUrl: '/user' }, axiosInstance);
