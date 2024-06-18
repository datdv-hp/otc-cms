import axiosInstance, { ApiService } from '@/plugins/axios';
import { IAuthTokens, ISignInBody, IUserProfile } from './types';
import { IBodyResponse } from '@/common/type';

class AuthApiService extends ApiService {
  signIn(body: ISignInBody): Promise<IBodyResponse<IAuthTokens>> {
    return this.client.post(`${this.baseUrl}/login`, body);
  }
  getProfile(): Promise<IBodyResponse<IUserProfile>> {
    return this.client.get(`/profile`);
  }
}
export const authApiService = new AuthApiService({ baseUrl: '/auth' }, axiosInstance);
