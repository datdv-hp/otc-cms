import { SystemSettingType } from '../../constant';

export type IRequestUpdateSystemSettingBodyDTO = {
  type: SystemSettingType;
  value_vi?: any;
  value_en?: any;
};
