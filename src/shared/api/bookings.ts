import { apiFetch } from './base';
import Cookies from 'js-cookie';

export interface BookingsPaymentsResponse {
  message: string;
}

export const getBookingsPayments = async (
  bookingId: string,
): Promise<BookingsPaymentsResponse[]> => {
  const token = Cookies.get('jwt_token');

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  return apiFetch(`/bookings/${bookingId}/payments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
