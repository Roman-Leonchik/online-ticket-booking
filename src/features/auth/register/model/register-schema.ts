import * as yup from 'yup';

export const registerSchema = yup
  .object({
    login: yup.string().required('Введите логин').min(8, 'Логин должен быть не менее 8 символов'),
    password: yup
      .string()
      .required('Введите пароль')
      .min(8, 'Пароль должен быть не менее 8 символов')
      .matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать минимум 1 заглавная буква')
      .matches(/[0-9]/, 'Пароль должен содержать минимум одну цифру'),
    passwordConfirmation: yup
      .string()
      .required('Введите пароль')
      .oneOf([yup.ref('password')], 'Пароль не совпадает'),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;
