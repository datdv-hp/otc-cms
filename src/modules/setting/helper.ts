import {
  IRequestCreateAwardBodyDTO,
  IRequestUpdateAwardBodyDTO
} from './dto/request/request.award-dto';
import {
  IRequestCreateCashbackBodyDTO,
  IRequestUpdateCashbackBodyDTO
} from './dto/request/request.cashback-dto';
import {
  IRequestCreateSystemSettingBodyDTO,
  IRequestUpdateSystemSettingBodyDTO
} from './dto/request/request.system-dto';
import { IResponseAwardDTO } from './dto/response/response.award-dto';
import { IResponseCashbackDTO } from './dto/response/response.cashback-dto';
import { IResponseSystemSettingDTO } from './dto/response/response.system-dto';
import {
  IAwardForm,
  IAwardSetting,
  IAwardSettingDetail,
  ICashbackForm,
  ICashbackSetting,
  ICashbackSettingDetail,
  ISystemSetting,
  ISystemSettingDetail,
  ISystemSettingForm
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
export const toRequestCreateCashbackFormDTO = (
  form: ICashbackForm
): IRequestCreateCashbackBodyDTO => {
  return {
    name: form.name,
    percent: form.percent
  };
};
export const toRequestUpdateCashbackFormDTO = (
  form: ICashbackForm
): IRequestUpdateCashbackBodyDTO => {
  return {
    name: form.name,
    percent: form.percent
  };
};

/** Award */

export const toAwardSettingListItem = (setting: IResponseAwardDTO): IAwardSetting => {
  return {
    id: setting.id,
    name: setting.name,
    icon: setting.icon,
    description: setting.description,
    stepValue: setting.step_value,
    createdAt: setting.created_at
  };
};
export const toAwardSettingList = (settings: IResponseAwardDTO[]): IAwardSetting[] => {
  return settings.map(toAwardSettingListItem);
};

export const toAwardSettingDetail = (setting: IResponseAwardDTO): IAwardSettingDetail => {
  return {
    id: setting.id,
    name: setting.name,
    icon: setting.icon,
    description: setting.description,
    stepValue: setting.step_value,
    createdAt: setting.created_at
  };
};

export const toRequestCreateAwardFormDTO = async (
  settings: IAwardForm
): Promise<IRequestCreateAwardBodyDTO> => {
  return {
    name: settings.name,
    icon: settings.icon,
    description: settings.description,
    step_value: settings.stepValue
  };
};
export const toRequestUpdateAwardFormDTO = async (
  settings: IAwardForm
): Promise<IRequestUpdateAwardBodyDTO> => {
  return {
    name: settings.name,
    icon: settings.icon,
    description: settings.description,
    step_value: settings.stepValue
  };
};

/** System */

export const toSystemSettingListItem = (setting: IResponseSystemSettingDTO): ISystemSetting => {
  return {
    id: setting.id,
    label: setting.label,
    type: setting.type,
    key: setting.key,
    value: setting.value,
    createdAt: setting.createdAt
  };
};
export const toSystemSettingList = (settings: IResponseSystemSettingDTO[]): ISystemSetting[] => {
  return settings.map(toSystemSettingListItem);
};

export const toSystemSettingDetail = (setting: IResponseSystemSettingDTO): ISystemSettingDetail => {
  return {
    id: setting.id,
    label: setting.label,
    type: setting.type,
    key: setting.key,
    value: setting.value,
    createdAt: setting.createdAt
  };
};

export const toRequestCreateSystemSettingFormDTO = (
  setting: ISystemSettingForm
): IRequestCreateSystemSettingBodyDTO => {
  return {
    label: setting.label,
    type: setting.type,
    key: setting.key,
    value: setting.value
  };
};
export const toRequestUpdateSystemSettingFormDTO = (
  setting: ISystemSettingForm
): IRequestUpdateSystemSettingBodyDTO => {
  return {
    label: setting.label,
    type: setting.type,
    key: setting.key,
    value: setting.value
  };
};
