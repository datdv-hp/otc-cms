import { IBodyResponse, IGetListData } from '@/common/type';
import axiosInstance, { ApiService } from '@/plugins/axios';
import { IRequestCreateCashbackBodyDTO } from './dto/request/request.cashback-dto';
import { IResponseCashbackDTO } from './dto/response/response.cashback-dto';
import { IAwardSetting, IAwardSettingQueryParams, ICashbackSettingQueryParams } from './type';

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
    data: IRequestCreateCashbackBodyDTO
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
  getAwardSetting(id: number): Promise<IBodyResponse<IAwardSetting>> {
    return this._getDetail<IAwardSetting>(id);
  }

  getAwardSettingList(
    params: IAwardSettingQueryParams
  ): Promise<IBodyResponse<IGetListData<IAwardSetting>>> {
    return this._getList<IAwardSetting, IAwardSettingQueryParams>(params);
  }

  async getAwardSettingByLink(url: string): Promise<IBodyResponse<IGetListData<IAwardSetting>>> {
    return this._getListByLink(url);
  }
}
export const awardSettingServiceApi = new AwardSettingApi(
  { baseUrl: '/award_setting' },
  axiosInstance
);
