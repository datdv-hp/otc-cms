import axiosInstance, { ApiService } from '@/plugins/axios';
import { ISignInBody } from './types';

class AuthApiService extends ApiService {
  signIn(body: ISignInBody) {
    return this.client.post('/sign-in', body);
  }
}
export const authApiService = new AuthApiService({ baseUrl: '/auth' }, axiosInstance);
