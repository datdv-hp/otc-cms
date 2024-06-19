import axiosInstance, { ApiService } from '@/plugins/axios';
import { IUserDetail, IUserListItem, IUserQueryParams } from './type';
import { IBodyResponse, IGetListData } from '@/common/type';

class UserApiService extends ApiService {
  getUser(id: number): Promise<IBodyResponse<IUserDetail>> {
    return this._getDetail<IUserDetail>(id);
  }

  getUserList(params: IUserQueryParams): Promise<IBodyResponse<IGetListData<IUserListItem>>> {
    return this._getList<IUserListItem, IUserQueryParams>(params);
  }

  async getUserListByLink(url: string): Promise<IBodyResponse<IGetListData<IUserListItem>>> {
    return this._getListByLink(url);
  }
}
export const userApiService = new UserApiService({ baseUrl: '/users' }, axiosInstance);
