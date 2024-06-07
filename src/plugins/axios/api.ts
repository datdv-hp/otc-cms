import type { IBodyResponse, IQueryParams, IGetListData } from '@/common/type';
import type { AxiosInstance } from 'axios';

interface IServiceOption {
  baseUrl: string;
}

export class ApiService {
  client: AxiosInstance;
  baseUrl: string;

  constructor(params: IServiceOption, axios: AxiosInstance) {
    this.client = axios;
    this.baseUrl = params.baseUrl;
  }

  get detailUrl(): string {
    return this.baseUrl;
  }

  get createUrl(): string {
    return this.baseUrl;
  }

  get updateUrl(): string {
    return this.baseUrl;
  }

  get deleteUrl(): string {
    return this.baseUrl;
  }

  useClient(axios: AxiosInstance): void {
    this.client = axios;
  }

  _getList<Record, T extends IQueryParams = IQueryParams>(
    queryString: T
  ): Promise<IBodyResponse<IGetListData<Record>>> {
    return this.client.get(`${this.baseUrl}`, {
      params: queryString
    });
  }

  _getDetail<Record>(id: number | string): Promise<IBodyResponse<Record>> {
    return this.client.get(this.detailUrl + '/' + id);
  }

  _create<Params, Record = any>(params: Params): Promise<IBodyResponse<Record>> {
    return this.client.post(this.createUrl, params);
  }

  _update<Params, Record>(id: number | string, params: Params): Promise<IBodyResponse<Record>> {
    return this.client.patch(this.updateUrl + '/' + id, params);
  }

  _delete<Record>(id: number | string): Promise<IBodyResponse<Record>> {
    return this.client.delete(this.deleteUrl + '/' + id);
  }
}
