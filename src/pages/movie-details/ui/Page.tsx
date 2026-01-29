import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMovies, getMovieSessionsById } from '@/shared/api/movies';
import { getCinemas } from '@/shared/api/cinemas';
import { TextError } from '@/shared/ui/text-error';
import { API_URL } from '@/shared/api/base';
import { formatTime } from '@/shared/lib/format/time';
import { getGroupedSessions } from '@/shared/lib/sort/group-sessions';
import { findById } from '@/shared/lib/find/find-by-id';
import { SessionSchedule } from '@/shared/ui/session-schedule/session-schedule';

interface MovieDetailsProps {
  id: string;
}

export const MovieDetailsPage = async ({ id }: MovieDetailsProps) => {
  const [allMovies, sessionsMovieData, allCinemas] = await Promise.all([
    getMovies().catch(() => []),
    getMovieSessionsById(id).catch(() => []),
    getCinemas().catch(() => []),
  ]);

  const movie = allMovies.find((m) => String(m.id) === id);
  const groupedMovieByDate = getGroupedSessions(sessionsMovieData, 'cinemaId');

  if (!movie) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-6">
      {!sessionsMovieData || sessionsMovieData.length === 0 ? (
        <TextError text="Сеансов нету" />
      ) : (
        <div>
          <h1 className="my-6 text-center text-4xl">{movie.title}</h1>
          <div className="mb-10 flex gap-6">
            <Image
              src={`${API_URL}${movie.posterImage}`}
              alt={movie.title}
              width={300}
              height={450}
              className="ml-auto h-auto w-75 object-cover"
              unoptimized
            />
            <div>
              <p className="mb-4 text-xl">{movie.description}</p>
              <ul className="flex flex-col gap-1 text-lg">
                <li>Год: {movie.year}</li>
                <li>Продолжительность: {formatTime(movie.lengthMinutes)}</li>
                <li>Рейтинг: {movie.rating}</li>
              </ul>
            </div>
          </div>
          <ul>
            <SessionSchedule
              data={groupedMovieByDate}
              renderTitle={(id) => findById(allCinemas, id)?.name || 'Кинонеатр'}
            />
          </ul>
        </div>
      )}
    </div>
  );
};
