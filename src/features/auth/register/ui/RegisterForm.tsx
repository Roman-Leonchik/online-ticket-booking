'use client';

import Cookies from 'js-cookie';
import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { regsiterRequest } from '../api/register';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, RegisterFormData } from '../model/register-schema';

export const RegisterForm = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError(null);

    try {
      const response = await regsiterRequest(data);

      Cookies.set('jwt_token', response.token, { expires: 30, secure: true, sameSite: 'strict' });

      window.location.href = '/tickets';
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError('Произошла ошибка');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-6">
      <h1 className="pb-6 text-center text-5xl">Регистрация</h1>
      <Input
        {...register('login')}
        label="Логин"
        type="text"
        placeholder="Введите логин"
        error={errors.login?.message}
      />
      <Input
        {...register('password')}
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        error={errors.password?.message}
      />
      <Input
        {...register('passwordConfirmation')}
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        error={errors.passwordConfirmation?.message}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 cursor-pointer self-center rounded-lg border px-8 py-4 text-xl transition-all hover:bg-gray-500/50"
      >
        Войти
      </button>
      {registerError && (
        <span className="text-error my-4 text-center text-xl font-bold">{registerError}</span>
      )}
    </form>
  );
};
