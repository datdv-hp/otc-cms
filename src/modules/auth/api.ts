import axiosInstance, { ApiService } from '@/plugins/axios';
import { IAuthTokens, ISignInBody } from './types';
import { IBodyResponse } from '@/common/type';

class AuthApiService extends ApiService {
  signIn(body: ISignInBody): Promise<IBodyResponse<IAuthTokens>> {
    return this.client.post(`${this.baseUrl}/sign-in`, body);
  }
}
export const authApiService = new AuthApiService({ baseUrl: '/auth' }, axiosInstance);
