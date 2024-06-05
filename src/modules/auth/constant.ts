import yup from '@/plugins/yup';

export const SignInSchema = yup.object().shape({
  username: yup.string().required().label('auth.username'),
  password: yup.string().required().label('auth.password')
});
