import { apiFetch } from './base';
import { cookies } from 'next/headers';
import { BookingsResponse } from '../types/users';

export const getBookings = async (): Promise<BookingsResponse[]> => {
  const token = (await cookies()).get('jwt_token')?.value;

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  return apiFetch(`/me/bookings?t=${Date.now()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    },
    cache: 'no-store',
  });
};
