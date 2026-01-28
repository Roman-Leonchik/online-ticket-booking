import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMovies, getMovieSessionsById } from '@/shared/api/movies';
import { getCinemas } from '@/shared/api/cinemas';
import { TextError } from '@/shared/ui/text-error';
import { API_URL } from '@/shared/api/base';
import { formatTime } from '@/shared/lib/format/time';
import { formatDateByTime } from '@/shared/lib/format/date';
import { getSortedAndGroupedSessions } from '@/shared/lib/sort/sessions-movies';
import { findById } from '@/shared/lib/find/find-by-id';
import { TimeLink } from '@/shared/ui/time-link';

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
  const groupedMovieByDate = getSortedAndGroupedSessions(sessionsMovieData);

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
            {Object.entries(groupedMovieByDate).map(([dateMovie, cinemas]) => (
              <div key={dateMovie} className="mb-8 flex flex-col gap-6">
                <h3 className="border-b-2 px-4 py-2 text-xl">{dateMovie}</h3>
                {Object.entries(cinemas).map(([idCinema, dateMovie]) => (
                  <div key={`cinema-${idCinema}`} className="flex items-center gap-6 px-4">
                    <span className="text-2xl">
                      {findById(allCinemas, idCinema)?.name || 'Cinema'}
                    </span>
                    <ul className="ml-auto flex gap-6">
                      {dateMovie.map((movie) => (
                        <li key={formatDateByTime(movie.startTime)}>
                          <TimeLink
                            time={formatDateByTime(movie.startTime)}
                            href={`tikets/${movie.movieId}`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
