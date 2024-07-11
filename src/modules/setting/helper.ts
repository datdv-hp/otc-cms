import {
  IRequestCreateAwardBodyDTO,
  IRequestUpdateAwardBodyDTO
} from './dto/request/request.award-dto';
import {
  IRequestCreateCashbackBodyDTO,
  IRequestUpdateCashbackBodyDTO
} from './dto/request/request.cashback-dto';
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
  ISystemSettingDetail
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
    nameVi: setting.name_vi,
    nameEn: setting.name_en,
    icon: setting.icon,
    descriptionVi: setting.description_vi,
    descriptionEn: setting.description_en,
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
    nameVi: setting.name_vi,
    nameEn: setting.name_en,
    icon: setting.icon,
    descriptionVi: setting.description_vi,
    stepValue: setting.step_value,
    createdAt: setting.created_at
  };
};

export const toRequestCreateAwardFormDTO = async (
  settings: IAwardForm
): Promise<IRequestCreateAwardBodyDTO> => {
  return {
    name_vi: settings.nameVi,
    name_en: settings.nameEn,
    icon: settings.icon,
    description_vi: settings.descriptionVi,
    description_en: settings.descriptionEn,
    step_value: settings.stepValue
  };
};
export const toRequestUpdateAwardFormDTO = async (
  settings: IAwardForm
): Promise<IRequestUpdateAwardBodyDTO> => {
  return {
    name_vi: settings.nameVi,
    name_en: settings.nameEn,
    icon: settings.icon,
    description_vi: settings.descriptionVi,
    description_en: settings.descriptionEn,
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
    valueVi: setting.value_vi,
    valueEn: setting.value_en,
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
    valueVi: setting.value_vi,
    valueEn: setting.value_en,
    createdAt: setting.createdAt
  };
};
