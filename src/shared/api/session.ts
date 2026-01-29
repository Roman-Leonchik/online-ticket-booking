import { apiFetch } from './base';
import Cookies from 'js-cookie';

export interface Seats {
  rows: number;
  seatsPerRow: number;
}

export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface MovieSessionsResponse {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: Seats;
  bookedSeats: Seat[];
}

export interface MovieBookingsResponse {
  bookingId: string;
}

export interface MovieBookingsRequest {
  seats: Seat[];
}

export const getMovieSessions = async (id: string): Promise<MovieSessionsResponse> => {
  return apiFetch(`/movieSessions/${id}`, {
    method: 'GET',
    next: {
      revalidate: 0,
    },
  });
};

export const movieBookings = async (
  id: string,
  data: MovieBookingsRequest,
): Promise<MovieBookingsResponse> => {
  const token = Cookies.get('jwt_token');

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  return apiFetch(`/movieSessions/${id}/bookings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
