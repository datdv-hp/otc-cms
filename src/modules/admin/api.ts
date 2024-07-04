import { IBodyResponse, IGetListData, IQueryParams } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { IRequestCreateAdminFormDTO, IRequestUpdateAdminFormDTO } from './dto/request.admin-dto';
import { IResponseAdminDTO } from './dto/response.admin-dto';

class AdminApiService extends ApiService {
  getAdminList(params: IQueryParams): Promise<IBodyResponse<IGetListData<IResponseAdminDTO>>> {
    return this._getList(params);
  }
  getAdmin(id: number | string): Promise<IBodyResponse<IResponseAdminDTO>> {
    return this._getDetail(id);
  }

  createAdmin(body: IRequestCreateAdminFormDTO): Promise<IBodyResponse<IResponseAdminDTO>> {
    return this._create(body);
  }
  updateAdmin(
    id: number,
    body: IRequestUpdateAdminFormDTO
  ): Promise<IBodyResponse<IResponseAdminDTO>> {
    return this._update(id, body);
  }
  deleteAdmin(id: number | string): Promise<IBodyResponse<IResponseAdminDTO>> {
    return this._delete(id);
  }
}
export const adminApiService = new AdminApiService({ baseUrl: '/admin' }, axiosInstance);
