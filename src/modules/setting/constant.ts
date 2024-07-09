import { TEXT_MAX_LENGTH } from '@/common/constants/common.constant';
import yup from '@/plugins/yup';
const MIN_CASHBACK = 0;
const MAX_CASHBACK = 100;

const MIN_STEP_VALUE = 0;
export const CashbackSettingFormSchema = yup.object({
  name: yup.string().max(TEXT_MAX_LENGTH).required().label('cashbackSetting.name'),
  percent: yup
    .number()
    .min(MIN_CASHBACK)
    .max(MAX_CASHBACK)
    .required()
    .label('cashbackSetting.percent')
});

export const AwardSettingFormSchema = yup.object({
  nameVi: yup.string().max(TEXT_MAX_LENGTH).required().label('awardSetting.name'),
  nameEn: yup.string().max(TEXT_MAX_LENGTH).label('awardSetting.name'),
  icon: yup.string().nullable().optional().label('awardSetting.icon'),
  stepValue: yup.number().min(MIN_STEP_VALUE).required().label('awardSetting.stepValue'),
  descriptionVi: yup.string().max(TEXT_MAX_LENGTH).nullable().label('awardSetting.description'),
  descriptionEn: yup.string().max(TEXT_MAX_LENGTH).nullable().label('awardSetting.description')
});

export enum SystemSettingType {
  DATE = 'date',
  FILE = 'file',
  NUMBER = 'number',
  TEXT = 'text',
  TEXTAREA = 'textarea',
  EDITOR = 'editor'
}
