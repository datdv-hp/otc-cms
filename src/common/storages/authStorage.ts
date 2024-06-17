import { DEFAULT_LANGUAGE, SupportLanguage, SupportTheme } from '../constants/common.constant';
import { storage } from './localStorage';

export const enum AUTH_SERVICE_KEY {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LANGUAGE = 'LANGUAGE',
  THEME = 'THEME'
}
class LocalStorageAuthService {
  setAuthTokens(
    tokens: {
      access_token: string;
      refresh_token: string;
      accessToken: string;
      refreshToken: string;
    } | null
  ): void {
    storage.setLocalStorage(
      AUTH_SERVICE_KEY.ACCESS_TOKEN,
      tokens?.access_token || tokens?.accessToken || ''
    );
    storage.setLocalStorage(
      AUTH_SERVICE_KEY.REFRESH_TOKEN,
      tokens?.refresh_token || tokens?.refreshToken || ''
    );
  }
  // ACCESS_TOKEN
  setAccessToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
  }
  getAccessToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
  }
  resetAccessToken(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
  }
  // ACCESS_TOKEN
  setRefreshToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
  }
  getRefreshToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
  }
  resetRefreshToken(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, '');
  }

  // LANGUAGE
  setLanguage(value: SupportLanguage): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.LANGUAGE, value);
  }
  getLanguage(): SupportLanguage {
    return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
      DEFAULT_LANGUAGE) as SupportLanguage;
  }

  getHeader() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Accept-Language': this.getLanguage() || DEFAULT_LANGUAGE
    };
  }

  getTheme() {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.THEME);
  }

  setTheme(theme: SupportTheme) {
    return storage.setLocalStorage(AUTH_SERVICE_KEY.THEME, theme);
  }

  resetAll(): void {
    this.resetAccessToken();
    this.resetRefreshToken();
  }
}

export const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
