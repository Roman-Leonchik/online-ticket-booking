import { getMovieSessions } from '@/shared/api/session';
import { notFound } from 'next/navigation';
import { getMovies } from '@/shared/api/movies';
import { getCinemas } from '@/shared/api/cinemas';
import { formatFullDateTime } from '@/shared/lib/format/date';
import { SeatSelection } from '@/features/seat-selection/ui/SeatSelection';

interface Props {
  sessionId: string;
}

export const SessionPage = async ({ sessionId }: Props) => {
  const session = await getMovieSessions(sessionId).catch(() => null);

  if (!session) notFound();

  const [allCinemas, allMovies] = await Promise.all([
    getCinemas().catch(() => []),
    getMovies().catch(() => []),
  ]);

  const cinema = allCinemas.find((cin) => cin.id === session.cinemaId);
  const movie = allMovies.find((mov) => mov.id === session.movieId);

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-6">
      <h1 className="mt-10 mb-6 text-center text-5xl">Выбрать места</h1>
      <ul className="mb-6 flex flex-col gap-1 text-lg">
        <li>{`Фильм: ${movie?.title || 'Movie'}`}</li>
        <li>{`Кинотеатр: ${cinema?.name || 'Cinema'}`}</li>
        <li>{`Время: ${formatFullDateTime(session.startTime)}`}</li>
      </ul>
      <SeatSelection
        movieSessionId={sessionId}
        rows={session.seats.rows}
        seatsPerRow={session.seats.seatsPerRow}
        {...session}
      />
    </div>
  );
};
