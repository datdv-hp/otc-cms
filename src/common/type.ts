import type { SortDirection } from './constants/common.constant';
import HttpStatus from './constants/http.constant';

export type Prettify<T> = {
  [P in keyof T]: T[P];
};

export type IResponseError<T = any> = {
  key: string;
  message: string;
  errorCode: HttpStatus;
  data?: T;
};

export type IBodyResponse<T> = {
  success: boolean;
  message: string;
  data: Prettify<T>;
  errors?: IResponseError<any>[];
};

export type IReferenceLink = {
  url: string;
  label: string | number;
  active: boolean;
};

export type IGetListData<T> = {
  data: T[];
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
  links: IReferenceLink[];
  from: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  prev_page_url: string | null;
  next_page_url: string | null;
  path: string;
};

export type IQueryParams = {
  page?: number;
  per_page?: number;
  order_by?: string;
  sort?: SortDirection | string;
  keyword?: string;
};

export type IOption = {
  title: string;
  value: string | number;
  disabled?: boolean;
  other?: any;
};
