'use client';

import React from 'react';
import Cookies from 'js-cookie';

export const ButtonExit = () => {
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    Cookies.remove('jwt_token');

    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full cursor-pointer border-t border-b border-white/0 p-4 text-2xl transition-all duration-300 hover:bg-gray-500/10"
    >
      Выход
    </button>
  );
};
