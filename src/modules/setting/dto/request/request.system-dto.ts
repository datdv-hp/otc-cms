import { SystemSettingType } from '../../constant';

export type IRequestUpdateSystemSettingBodyDTO = {
  type: SystemSettingType;
  valueVi?: any;
  valueEn?: any;
};
