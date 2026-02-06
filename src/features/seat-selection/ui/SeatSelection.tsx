'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { cn } from '@/shared/config/utils';
import { useRouter } from 'next/navigation';
import { getSeatKey, parseSeatKeysToObjects } from '@/entities/seat/lib';
import { movieBookings } from '@/shared/api/session';

interface SeatSelectionProps {
  movieSessionId: string;
  rows: number;
  seatsPerRow: number;
  bookedSeats: { rowNumber: number; seatNumber: number }[];
}

export const SeatSelection = ({
  movieSessionId,
  rows,
  seatsPerRow,
  bookedSeats,
}: SeatSelectionProps) => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsAuth(!!Cookies.get('jwt_token'));
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return <div className="h-10 w-10" />;

  const bookedSet = new Set(bookedSeats.map((s) => getSeatKey(s.rowNumber, s.seatNumber)));

  const toggleSeat = (event: React.MouseEvent<HTMLButtonElement>, key: string) => {
    event.preventDefault();

    setSelectedSeats((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    );
  };

  const handleReservation = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isAuth) {
      router.push('/auth');
    } else {
      const data = {
        seats: parseSeatKeysToObjects(selectedSeats),
      };

      await movieBookings(movieSessionId, data);
      router.push('/tickets');
    }
  };

  return (
    <>
      <div className="items-[safe_center] flex w-full flex-col items-center gap-3 overflow-x-auto p-4">
        <div className="mb-4 flex items-center gap-2">
          <span className="w-14" />
          {Array.from({ length: seatsPerRow }).map((_, seatIndex) => (
            <span
              key={`header-seat-${seatIndex}`}
              className="flex w-14 items-center justify-center text-2xl"
            >
              {seatIndex + 1}
            </span>
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const rowNum = rowIndex + 1;

          return (
            <div key={rowNum} className="mx-auto flex min-w-max items-center gap-2">
              <span className="text-2xs w-14 text-white">{`Ряд ${rowNum}`}</span>

              {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                const seatNum = seatIndex + 1;
                const key = getSeatKey(rowNum, seatNum);

                const isBooked = bookedSet.has(key);
                const isSelected = selectedSeats.includes(key);

                return (
                  <button
                    key={key}
                    disabled={Boolean(isBooked) || Boolean(!isAuth)}
                    onClick={(e) => toggleSeat(e, key)}
                    title={`Ряд ${rowNum}, Место ${seatNum}`}
                    className={cn(
                      'h-14 w-14 cursor-pointer rounded-sm border-2 transition-all duration-200',
                      isBooked && 'bg-error cursor-not-allowed',
                      !isBooked && !isSelected && 'hover:border-choice border-white/50',
                      isSelected && 'bg-expectation border-white',
                      !isAuth && 'cursor-not-allowed hover:border-white/50',
                    )}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        onClick={handleReservation}
        className="mt-6 cursor-pointer self-center rounded-lg border px-8 py-4 text-xl transition-all hover:bg-gray-500/50"
      >
        Забронировать
      </button>
    </>
  );
};
