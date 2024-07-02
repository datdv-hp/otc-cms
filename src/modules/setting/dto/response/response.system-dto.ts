import { SystemSettingType } from '../../constant';

export type IResponseSystemSettingDTO = {
  id: number;
  type: SystemSettingType;
  label: string;
  key: string;
  value: any;
  createdAt: Date;
};
