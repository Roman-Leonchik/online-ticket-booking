export const dynamic = 'force-dynamic';

import { getBookings } from '@/shared/api/users';
import { getCinemas } from '@/shared/api/cinemas';
import { getMovies } from '@/shared/api/movies';
import { getMovieSessions } from '@/shared/api/session';
import { categorizeBookings, SessionInfo } from '@/shared/lib/format/filter-bookings';
import { BookingCard } from '@/features/booking-card/ui/BookingCard';

export const TicketsPage = async () => {
  const [bookings, allMovies, allCinemas] = await Promise.all([
    getBookings().catch(() => []),
    getMovies().catch(() => []),
    getCinemas().catch(() => []),
  ]);
  const uniqueSessionIds = Array.from(new Set(bookings.map((order) => order.movieSessionId)));

  const sessions = await Promise.all(
    uniqueSessionIds.map((id) => getMovieSessions(String(id)).catch(() => null)),
  );

  const sessionDatesMap: Record<number, SessionInfo> = {};

  sessions.forEach((s) => {
    if (s) {
      sessionDatesMap[Number(s.id)] = {
        startTime: s.startTime,
        movieId: s.movieId,
        cinemaId: s.cinemaId,
      };
    }
  });

  const { unpaid, future, past } = categorizeBookings(bookings, sessionDatesMap);

  const SECTIONS = [
    { title: 'Неоплаченные', data: unpaid },
    { title: 'Предстоящие', data: future },
    { title: 'Прошедшие', data: past },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-6">
      <h1 className="my-10 text-center text-5xl">Мои билеты</h1>
      {unpaid.length === 0 && future.length === 0 && past.length === 0 && (
        <h2 className="pt-20 text-center text-3xl uppercase italic">У вас пока нет билетов</h2>
      )}
      {SECTIONS.map(({ title, data }) => {
        if (data.length === 0) return null;

        return (
          <section key={title} className="flex flex-col gap-8">
            <h2 className="mb-10 border-b-2 p-4 text-xl">{title}</h2>
            <ul className="flex flex-col gap-6">
              {data.map((item) => (
                <li key={item.id}>
                  <BookingCard
                    booking={item}
                    movies={allMovies}
                    cinemas={allCinemas}
                    sessionDatesMap={sessionDatesMap}
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
