import { IBodyResponse, IGetListData } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { UserStatus } from './constant';
import {
  IRequestUpdateUserRefundFormDTO,
  IUpdateUserStatusParamsDTO,
  IUserQueryParamsDTO,
  IUserTransactionQueryParamsDTO
} from './dto/request.user-dto';
import {
  IResponseUserDetailDTO,
  IResponseUserListItemDTO,
  IResponseUserRefundDTO,
  IResponseUserTransactionDTO
} from './dto/response.user-dto';

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
    return this._delete<IResponseUserDetailDTO, IUpdateUserStatusParamsDTO>(id, {
      status: UserStatus.INACTIVE
    });
  }

  unbanUser(id: number | string): Promise<IBodyResponse<IResponseUserDetailDTO>> {
    return this._delete<IResponseUserDetailDTO, IUpdateUserStatusParamsDTO>(id, {
      status: UserStatus.ACTIVE
    });
  }

  getRefundByUser(
    id: number | string
  ): Promise<IBodyResponse<IGetListData<IResponseUserRefundDTO>>> {
    return this.client.get(`${this.baseUrl}/${id}/refund_configuration`);
  }
  bulkUpdateRefundByUser(
    id: number | string,
    data: IRequestUpdateUserRefundFormDTO
  ): Promise<IBodyResponse<IGetListData<IResponseUserRefundDTO>>> {
    return this.client.patch(`${this.baseUrl}/${id}/refund_configuration`, data);
  }

  getTransactionList(
    id: number | string,
    query: IUserTransactionQueryParamsDTO
  ): Promise<IBodyResponse<IGetListData<IResponseUserTransactionDTO>>> {
    return this.client.get(`${this.baseUrl}/${id}/transaction`, { params: query });
  }

  async getUserListByLink(
    url: string
  ): Promise<IBodyResponse<IGetListData<IResponseUserDetailDTO>>> {
    return this._getListByLink(url);
  }
}
export const userApiService = new UserApiService({ baseUrl: '/user' }, axiosInstance);
