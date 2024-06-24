import { IBodyResponse, IGetListData } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { UserStatus } from './constant';
import { IUpdateUserStatusParamsDTO, IUserQueryParamsDTO } from './dto/request.user-dto';
import { IResponseUserDetailDTO, IResponseUserListItemDTO } from './dto/response.user-dto';

class UserApiService extends ApiService {
  getUser(id: number): Promise<IBodyResponse<IResponseUserDetailDTO>> {
    return this._getDetail<IResponseUserDetailDTO>(id);
  }

  getUserList(
    params: IUserQueryParamsDTO
  ): Promise<IBodyResponse<IGetListData<IResponseUserListItemDTO>>> {
    return this._getList<IResponseUserListItemDTO, IUserQueryParamsDTO>(params);
  }

  banUser(id: number | string): Promise<IBodyResponse<IResponseUserDetailDTO>> {
    return this._delete<IResponseUserDetailDTO, IUpdateUserStatusParamsDTO>(
      `${this.baseUrl}/${id}`,
      { status: UserStatus.INACTIVE }
    );
  }

  unbanUser(id: number | string): Promise<IBodyResponse<IResponseUserDetailDTO>> {
    return this._delete<IResponseUserDetailDTO, IUpdateUserStatusParamsDTO>(
      `${this.baseUrl}/${id}`,
      { status: UserStatus.ACTIVE }
    );
  }

  async getUserListByLink(
    url: string
  ): Promise<IBodyResponse<IGetListData<IResponseUserDetailDTO>>> {
    return this._getListByLink(url);
  }
}
export const userApiService = new UserApiService({ baseUrl: '/users' }, axiosInstance);
