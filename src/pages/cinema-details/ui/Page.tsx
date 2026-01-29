import { notFound } from 'next/navigation';
import { getMovies } from '@/shared/api/movies';
import { getCinemas, getCinemasSessionsById } from '@/shared/api/cinemas';
import { getGroupedSessions } from '@/shared/lib/sort/group-sessions';
import { TextError } from '@/shared/ui/text-error';
import { findById } from '@/shared/lib/find/find-by-id';
import { SessionSchedule } from '@/shared/ui/session-schedule/session-schedule';

interface CinemaDetailsProps {
  id: string;
}

export const CinemaDetailsPage = async ({ id }: CinemaDetailsProps) => {
  const [allCinemas, sessionsCinemaData, allMovies] = await Promise.all([
    getCinemas().catch(() => []),
    getCinemasSessionsById(id).catch(() => []),
    getMovies().catch(() => []),
  ]);

  const cinema = allCinemas.find((m) => String(m.id) === id);
  const groupedCinemaByDate = getGroupedSessions(sessionsCinemaData, 'movieId');

  if (!cinema) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-6">
      {!sessionsCinemaData || sessionsCinemaData.length === 0 ? (
        <TextError text="Расписание нету" />
      ) : (
        <div>
          <h1 className="my-10 border-b-2 pb-6 text-center text-4xl">{cinema.name}</h1>
          <SessionSchedule
            data={groupedCinemaByDate}
            renderTitle={(id) => findById(allMovies, id)?.title || 'Фильм'}
          />
        </div>
      )}
    </div>
  );
};
