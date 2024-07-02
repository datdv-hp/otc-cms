import { IBodyResponse, IGetListData } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import {
  IRequestCreateAwardBodyDTO,
  IRequestUpdateAwardBodyDTO
} from './dto/request/request.award-dto';
import {
  IRequestCreateCashbackBodyDTO,
  IRequestUpdateCashbackBodyDTO
} from './dto/request/request.cashback-dto';
import { IResponseAwardDTO } from './dto/response/response.award-dto';
import { IResponseCashbackDTO } from './dto/response/response.cashback-dto';
import {
  IAwardSettingQueryParams,
  ICashbackSettingQueryParams,
  ISystemSettingQueryParams
} from './type';
import { IResponseSystemSettingDTO } from './dto/response/response.system-dto';
import {
  IRequestCreateSystemSettingBodyDTO,
  IRequestUpdateSystemSettingBodyDTO
} from './dto/request/request.system-dto';

class CashbackSettingApi extends ApiService {
  getCashbackSetting(id: number | string): Promise<IBodyResponse<IResponseCashbackDTO>> {
    return this._getDetail<IResponseCashbackDTO>(id);
  }

  getCashbackSettingList(
    params: ICashbackSettingQueryParams
  ): Promise<IBodyResponse<IGetListData<IResponseCashbackDTO>>> {
    return this._getList<IResponseCashbackDTO, ICashbackSettingQueryParams>(params);
  }

  getCashbackSettingByLink(
    url: string
  ): Promise<IBodyResponse<IGetListData<IResponseCashbackDTO>>> {
    return this._getListByLink(url);
  }

  createCashbackSetting(
    data: IRequestCreateCashbackBodyDTO
  ): Promise<IBodyResponse<IResponseCashbackDTO>> {
    return this._create(data);
  }
  updateCashbackSetting(
    id: string | number,
    data: IRequestUpdateCashbackBodyDTO
  ): Promise<IBodyResponse<IResponseCashbackDTO>> {
    return this._update(id, data);
  }

  deleteCashbackSetting(id: string | number): Promise<IBodyResponse<IResponseCashbackDTO>> {
    return this._delete(id);
  }
}
export const cashbackSettingServiceApi = new CashbackSettingApi(
  { baseUrl: '/cashback_setting' },
  axiosInstance
);

class AwardSettingApi extends ApiService {
  getAwardSetting(id: number | string): Promise<IBodyResponse<IResponseAwardDTO>> {
    return this._getDetail<IResponseAwardDTO>(id);
  }

  getAwardSettingList(
    params: IAwardSettingQueryParams
  ): Promise<IBodyResponse<IGetListData<IResponseAwardDTO>>> {
    return this._getList<IResponseAwardDTO, IAwardSettingQueryParams>(params);
  }

  createAwardSetting(data: IRequestCreateAwardBodyDTO): Promise<IBodyResponse<IResponseAwardDTO>> {
    return this._create(data);
  }
  updateAwardSetting(
    id: string | number,
    data: IRequestUpdateAwardBodyDTO
  ): Promise<IBodyResponse<IResponseAwardDTO>> {
    return this._update(id, data);
  }

  deleteAwardSetting(id: string | number): Promise<IBodyResponse<IResponseAwardDTO>> {
    return this._delete(id);
  }

  async getAwardSettingByLink(
    url: string
  ): Promise<IBodyResponse<IGetListData<IResponseAwardDTO>>> {
    return this._getListByLink(url);
  }
}
export const awardSettingServiceApi = new AwardSettingApi(
  { baseUrl: '/award_setting' },
  axiosInstance
);

class SystemSettingApi extends ApiService {
  getSystemSetting(id: number | string): Promise<IBodyResponse<IResponseSystemSettingDTO>> {
    return this._getDetail(id);
  }

  getSystemSettingList(
    params: ISystemSettingQueryParams
  ): Promise<IBodyResponse<IGetListData<IResponseSystemSettingDTO>>> {
    return this._getList<IResponseSystemSettingDTO, ISystemSettingQueryParams>(params);
  }

  createSystemSetting(
    data: IRequestCreateSystemSettingBodyDTO
  ): Promise<IBodyResponse<IResponseSystemSettingDTO>> {
    return this._create(data);
  }
  updateSystemSetting(
    id: string | number,
    data: IRequestUpdateSystemSettingBodyDTO
  ): Promise<IBodyResponse<IResponseSystemSettingDTO>> {
    return this._update(id, data);
  }

  deleteSystemSetting(id: string | number): Promise<IBodyResponse<IResponseSystemSettingDTO>> {
    return this._delete(id);
  }

  async getSystemSettingByLink(
    url: string
  ): Promise<IBodyResponse<IGetListData<IResponseSystemSettingDTO>>> {
    return this._getListByLink(url);
  }
}
export const systemSettingServiceApi = new SystemSettingApi(
  { baseUrl: '/system_setting' },
  axiosInstance
);
