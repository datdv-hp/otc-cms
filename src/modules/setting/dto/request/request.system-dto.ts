import { SystemSettingType } from '../../constant';

export type IRequestCreateSystemSettingBodyDTO = {
  type: SystemSettingType;
  label: string;
  key: string;
  value: any;
};

export type IRequestUpdateSystemSettingBodyDTO = {
  type: SystemSettingType;
  value: any;
};
