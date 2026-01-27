import * as yup from 'yup';

export const loginSchema = yup
  .object({
    login: yup.string().required('Введите логин').min(8, 'Логин должен быть не менее 8 символов'),
    password: yup
      .string()
      .required('Введите пароль')
      .min(8, 'Пароль должен быть не менее 8 символов')
      .matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать минимум 1 заглавная буква')
      .matches(/[0-9]/, 'Пароль должен содержать минимум одну цифру'),
  })
  .required();

export type LoginFormData = yup.InferType<typeof loginSchema>;
