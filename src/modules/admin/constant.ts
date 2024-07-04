import { Regex, TEXT_MAX_LENGTH } from '@/common/constants/common.constant';
import yup from '@/plugins/yup';

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export const StatusColor = {
  [AccountStatus.ACTIVE]: 'success',
  [AccountStatus.INACTIVE]: 'warning'
};

export const AdminCreateFormSchema = yup.object({
  fullname: yup.string().max(TEXT_MAX_LENGTH).required().label('admin.fullname'),
  username: yup
    .string()
    .max(TEXT_MAX_LENGTH)
    .required()
    .matches(new RegExp(Regex.USERNAME), 'admin.validate.validUsername')
    .label('admin.username'),
  password: yup
    .string()
    .max(TEXT_MAX_LENGTH)
    .required('admin.validate.emptyPassword')
    .label('admin.password'),
  confirmPassword: yup
    .string()
    .max(TEXT_MAX_LENGTH)
    .oneOf([yup.ref('password')], 'admin.validate.confirmPassword')
    .required('admin.validate.emptyPassword')
    .label('admin.confirmPassword')
});

export const AdminUpdateFormSchema = yup.object({
  fullname: yup.string().max(TEXT_MAX_LENGTH).required().label('admin.fullname'),
  username: yup
    .string()
    .max(TEXT_MAX_LENGTH)
    .required()
    .matches(new RegExp(Regex.USERNAME), 'admin.validate.validUsername')
    .label('admin.username'),
  password: yup.string().max(TEXT_MAX_LENGTH).optional().label('admin.password'),
  confirmPassword: yup
    .string()
    .max(TEXT_MAX_LENGTH)
    .oneOf([yup.ref('password')], 'admin.validate.confirmPassword')
    .label('admin.confirmPassword')
    .when('password', ([password], schema) => {
      return password ? schema.required('admin.validate.emptyPassword') : schema;
    })
});
