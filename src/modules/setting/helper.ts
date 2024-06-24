import { IRequestCreateCashbackBodyDTO } from './dto/request/request.cashback-dto';
import { IResponseCashbackDTO } from './dto/response/response.cashback-dto';
import {
  IAwardSetting,
  IAwardSettingDetail,
  ICashbackForm,
  ICashbackSetting,
  ICashbackSettingDetail
} from './type';

/** Cashback */
export const toCashbackSettingListItem = (setting: IResponseCashbackDTO): ICashbackSetting => {
  return {
    id: setting.id,
    name: setting.name,
    percent: setting.percent,
    createdAt: setting.created_at
  };
};
export const toCashbackSettingList = (settings: IResponseCashbackDTO[]): ICashbackSetting[] => {
  return settings.map(toCashbackSettingListItem);
};
export const toCashbackSettingDetail = (setting: IResponseCashbackDTO): ICashbackSettingDetail => {
  return {
    id: setting.id,
    name: setting.name,
    percent: setting.percent,
    createdAt: setting.created_at
  };
};
export const toRequestCreateCashbackDTO = (form: ICashbackForm): IRequestCreateCashbackBodyDTO => {
  return {
    name: form.name,
    percent: form.percent
  };
};

/** Award */

export const toAwardSettingListItem = (setting: Record<string, unknown>): IAwardSetting => {
  return {
    id: setting.id as string,
    name: setting.name as string,
    icon: setting.icon as string,
    description: setting.description as string,
    stepValue: setting.step_value as number,
    createdAt: setting.created_at as string
  };
};
export const toAwardSettingList = (settings: Record<string, unknown>[]): IAwardSetting[] => {
  return settings.map(toAwardSettingListItem);
};

export const toAwardSettingDetail = (setting: Record<string, unknown>): IAwardSettingDetail => {
  return {
    id: setting.id as string,
    name: setting.name as string,
    icon: setting.icon as string,
    description: setting.description as string,
    stepValue: setting.step_value as number,
    createdAt: setting.created_at as string
  };
};

export const toAwardFormDTO = (settings: Record<string, unknown>) => {
  return {
    name: settings.name as string,
    icon: settings.icon as string,
    description: settings.description as string,
    step_value: settings.stepValue as number
  };
};
