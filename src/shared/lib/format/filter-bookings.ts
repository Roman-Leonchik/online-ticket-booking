import { BookingsResponse } from '@/shared/api/users';

export interface SessionInfo {
  startTime: string;
  movieId: number;
  cinemaId: number;
}

export interface CategoryBookings {
  unpaid: BookingsResponse[];
  future: BookingsResponse[];
  past: BookingsResponse[];
}

export const categorizeBookings = (
  bookings: BookingsResponse[],
  sessionDatesMap: Record<number, SessionInfo>,
): CategoryBookings => {
  const now = new Date().getTime();

  return bookings.reduce(
    (acc: CategoryBookings, booking) => {
      if (!booking.isPaid) {
        acc.unpaid.push(booking);
        return acc;
      }

      const sessionDateIso = sessionDatesMap[booking.movieSessionId];
      if (!sessionDateIso) return acc;

      const sessionTime = new Date(sessionDateIso.startTime).getTime();

      if (sessionTime > now) {
        acc.future.push(booking);
      } else {
        acc.past.push(booking);
      }

      return acc;
    },
    { unpaid: [], future: [], past: [] },
  );
};
