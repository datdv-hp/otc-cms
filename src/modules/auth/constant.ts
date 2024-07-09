import { TEXT_MAX_LENGTH } from '@/common/constants/common.constant';
import yup from '@/plugins/yup';

export const SignInSchema = yup.object().shape({
  username: yup.string().required().label('auth.username'),
  password: yup.string().required().label('auth.password')
});

export const ChangePasswordSchema = yup.object({
  password: yup.string().required().label('auth.password'),
  newPassword: yup.string().max(TEXT_MAX_LENGTH).required().label('auth.newPassword'),
  confirmPassword: yup
    .string()
    .max(TEXT_MAX_LENGTH)
    .required()
    .oneOf([yup.ref('newPassword')], 'admin.validate.confirmPassword')
    .label('auth.newPassword')
});
