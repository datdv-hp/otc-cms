export enum SupportLanguage {
  VI = 'vi',
  EN = 'en'
}
export const DEFAULT_LANGUAGE = SupportLanguage.VI;

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum PageName {
  SIGN_IN_PAGE = 'sign_in_page',
  SIGN_UP_PAGE = 'sign_up_page',
  PROFILE_PAGE = 'profile_page',
  USER_LIST_PAGE = 'user_list_page',
  USER_DETAIL_PAGE = 'user_detail_page',
  NOT_FOUND_PAGE = 'not_found_page',
  FORBIDDEN_PAGE = 'forbidden_page',
  HOME_PAGE = 'home_page',
  SETTING_CASHBACK_PAGE = 'setting_cashback_page',
  SETTING_ENCOURAGE_TRADING_PAGE = 'setting_encourage_trading_page',
  ADMIN_LIST_PAGE = 'admin_list_page'
}

export enum SupportTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum DATE_TIME_FORMAT {
  YYYYMMDDHHmmss_HYPHEN = 'YYYY-MM-DD HH:mm:ss',
  YYYYMMDDHHmmss_SLASH = 'YYYY/MM/DD HH:mm:ss',
  YYYYMMDD_HYPHEN = 'YYYY-MM-DD',
  YYYYMMDD_SLASH = 'YYYY/MM/DD',
  HHmmss = 'HH:mm:ss',
  DDMMYYYY_HYPHEN = 'DD-MM-YYYY',
  DDMMYYYY_SLASH = 'DD/MM/YYYY',
  DDMMYYYYHHmmss_HYPHEN = 'DD-MM-YYYY HH:mm:ss',
  DDMMYYYYHHmmss_SLASH = 'DD/MM/YYYY HH:mm:ss'
}

export const TEXT_MAX_LENGTH = 255;
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
