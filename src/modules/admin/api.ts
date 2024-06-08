import { IQueryParams } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { IAdmin, ICreateAdminBody } from './type';

class AdminApiService extends ApiService {
  getAdminList(params: IQueryParams) {
    return this._getList<IAdmin>(params);
  }
  createAdmin(body: ICreateAdminBody) {
    return this._create<ICreateAdminBody, IAdmin>(body);
  }
}
export const adminApiService = new AdminApiService({ baseUrl: '/auth/admin' }, axiosInstance);
