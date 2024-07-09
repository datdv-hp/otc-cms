import { IQueryParams } from '@/common/type';
import { SystemSettingType } from './constant';

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
  nameVi?: string;
  nameEn?: string;
  stepValue: number;
  icon?: {
    name: string;
    mimeType: string;
    url: string;
  } | null;
  descriptionVi?: string;
  descriptionEn?: string;
  createdAt: string | Date;
};
export type IAwardSettingDetail = IAwardSetting;
export type IAwardSettingQueryParams = IQueryParams;
export type IAwardForm = {
  nameVi: string;
  nameEn: string;
  stepValue: number;
  icon: ArrayBuffer | string | null;
  descriptionVi?: string;
  descriptionEn?: string;
};

export type ISystemSetting = {
  id: number;
  type: SystemSettingType;
  label: string;
  key: string;
  valueVi: any;
  valueEn: any;
  createdAt: Date;
};
export type ISystemSettingDetail = ISystemSetting;
export type ISystemSettingQueryParams = IQueryParams;
export type ISystemSettingForm = {
  type: SystemSettingType;
  label: string;
  key: string;
  valueVi: any;
  valueEn: any;
};
