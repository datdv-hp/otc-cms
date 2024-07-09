import { SystemSettingType } from '../../constant';

export type IResponseSystemSettingDTO = {
  id: number;
  type: SystemSettingType;
  label: string;
  key: string;
  value_vi?: any;
  value_en?: any;
  createdAt: Date;
};
