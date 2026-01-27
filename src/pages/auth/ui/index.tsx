'use client';

import { useState } from 'react';
import { LoginForm } from '@/features/auth/login';
import { RegisterForm } from '@/features/auth/register';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <section className="mt-4 mb-4 flex flex-col items-center">
      {isLogin ? (
        <>
          <LoginForm />
          <div className="mt-10 flex text-3xl">
            <p>Если у вас нет аккаунта&nbsp;</p>
            <button className="cursor-pointer border-b" onClick={() => setIsLogin((prev) => !prev)}>
              зарегестрируйтесь
            </button>
          </div>
        </>
      ) : (
        <>
          <RegisterForm />
          <div className="mt-10 flex text-3xl">
            <p>Если вы уже зарегестрированы&nbsp;</p>
            <button className="cursor-pointer border-b" onClick={() => setIsLogin((prev) => !prev)}>
              войдите
            </button>
          </div>
        </>
      )}
    </section>
  );
};
