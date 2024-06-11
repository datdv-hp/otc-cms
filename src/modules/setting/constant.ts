import { TEXT_MAX_LENGTH } from '@/common/constants/common.constant';
import yup from '@/plugins/yup';
const MIN_CASHBACK = 0;
const MAX_CASHBACK = 100;
export const CreateCashbackSettingSchema = yup.object({
  name: yup.string().max(TEXT_MAX_LENGTH).required().label('cashbackSetting.name'),
  cashbackValue: yup
    .number()
    .min(MIN_CASHBACK)
    .max(MAX_CASHBACK)
    .required()
    .label('cashbackSetting.cashbackValue')
});
