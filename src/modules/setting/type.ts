import { IQueryParams } from '@/common/type';

export type ICashbackSetting = {
  id: string | number;
  name: string;
  percent: number;
  createdAt: string | Date;
};
export type ICashbackSettingDetail = ICashbackSetting;
export type ICashbackSettingQueryParams = IQueryParams;
export type ICashbackForm = {
  name: string;
  percent: number;
};

export type IAwardSetting = {
  id: string | number;
  name: string;
  stepValue: number;
  icon: string;
  description?: string;
  createdAt: string | Date;
};
export type IAwardSettingDetail = IAwardSetting;
export type IAwardSettingQueryParams = IQueryParams;
export type IAwardForm = {
  name: string;
  stepValue: number;
  icon: ArrayBuffer | string | null;
  description: string;
};
