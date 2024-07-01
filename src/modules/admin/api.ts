import { IBodyResponse, IGetListData, IQueryParams } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { IResponseAdminDTO } from './dto/response.admin-dto';
import { ICreateAdminBody } from './type';

class AdminApiService extends ApiService {
  getAdminList(params: IQueryParams): Promise<IBodyResponse<IGetListData<IResponseAdminDTO>>> {
    return this._getList(params);
  }
  createAdmin(body: ICreateAdminBody): Promise<IBodyResponse<IResponseAdminDTO>> {
    return this._create(body);
  }
  deleteAdmin(id: number | string): Promise<IBodyResponse<IResponseAdminDTO>> {
    return this._delete(id);
  }
}
export const adminApiService = new AdminApiService({ baseUrl: '/admin' }, axiosInstance);
