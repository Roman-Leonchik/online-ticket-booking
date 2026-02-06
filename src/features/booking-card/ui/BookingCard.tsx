'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingsResponse } from '@/shared/types/users';
import { MoviesResponse } from '@/shared/types/movies';
import { getBookingsPayments } from '@/shared/api/bookings';
import { getSettings } from '@/shared/api/settings';
import { calculateTimeLeft } from '@/shared/lib/format/timer/timer';
import { SessionInfo } from '@/shared/lib/format/filter-bookings';
import { formatFullDateTime } from '@/shared/lib/format/date';
import { CinemasResponse } from '@/shared/types/cinemas';
import { formatTimeSeconds } from '@/shared/lib/format/time/time';

interface BookingCardProps {
  booking: BookingsResponse;
  movies: MoviesResponse[];
  cinemas: CinemasResponse[];
  sessionDatesMap: Record<number, SessionInfo>;
}

export const BookingCard = ({ booking, movies, sessionDatesMap, cinemas }: BookingCardProps) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (booking.isPaid) return;
    const fetchSettings = async () => {
      try {
        const settings = await getSettings();
        setTimeLeft(calculateTimeLeft(booking.bookedAt, settings.bookingPaymentTimeSeconds));
      } catch (error) {
        console.error('Ошибка найстройки', error);
      }
    };

    fetchSettings();
  }, [booking.isPaid]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !booking.isPaid) {
      router.refresh();
    }
  }, [timeLeft, booking.isPaid, router]);

  const currentSession = sessionDatesMap[booking.movieSessionId];
  const movie = movies.filter((mov) => mov.id === currentSession.movieId)?.[0];
  const cinema = cinemas.filter((cin) => cin.id === currentSession.cinemaId)?.[0];

  const handleByuTicket = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await getBookingsPayments(booking.id);

    router.refresh();
  };

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col gap-2 text-xl">
        <span>{movie?.title || 'Фильм'}</span>
        <span>{cinema?.name || 'Кинотеатр'}</span>
        <span>{formatFullDateTime(currentSession.startTime)}</span>
      </div>
      <div>
        <ul className="flex flex-col gap-2 text-xl">
          {booking.seats.map((seat) => (
            <li key={`${seat.rowNumber}-${seat.seatNumber}`}>
              {`Ряд ${seat.rowNumber}, место ${seat.seatNumber}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 items-start gap-4 text-xl">
        {!booking.isPaid && (
          <>
            <div>
              <button
                onClick={handleByuTicket}
                className="cursor-pointer self-start rounded-lg border px-8 py-4 text-xl transition-all hover:bg-gray-500/50"
              >
                Оплатить
              </button>
            </div>
            <div>
              <span className="flex h-14 items-center">
                Осталось {`${formatTimeSeconds(timeLeft)}`}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
