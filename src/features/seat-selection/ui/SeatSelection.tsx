'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { getSeatKey } from '@/entities/seat/lib';

interface SeatSelectionProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: { rowNumber: number; seatNumber: number }[];
}

export const SeatSelection = ({ rows, seatsPerRow, bookedSeats }: SeatSelectionProps) => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const bookedSet = new Set(bookedSeats.map((s) => getSeatKey(s.rowNumber, s.seatNumber)));

  const isAuth = !!Cookies.get('jwt_token');

  const toggleSeat = (event: React.MouseEvent<HTMLButtonElement>, key: string) => {
    event.preventDefault();

    setSelectedSeats((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    );
  };

  const handleReservation = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (!isAuth) {
      router.push('/auth');
    } else {
      console.log(selectedSeats);
      router.push('/tickets');
    }
  };

  return (
    <>
      <div className="items-[safe_center] flex w-full flex-col items-center gap-3 overflow-x-auto p-4">
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
                    disabled={isBooked || !isAuth}
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
