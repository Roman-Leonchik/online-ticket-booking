import { MovieSessionsResponse } from '@/shared/api/movies';
import { formatDate } from '@/shared/lib/format/date';

export const getSortedAndGroupedSessions = (sessions: MovieSessionsResponse[]) => {
  const sorted = [...sessions].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  const grouped: Record<string, Record<string, MovieSessionsResponse[]>> = {};

  sorted.forEach((session) => {
    const dateKey = formatDate(session.startTime);
    const cinemaId = session.cinemaId.toString();

    if (!grouped[dateKey]) {
      grouped[dateKey] = {};
    }

    if (!grouped[dateKey][cinemaId]) {
      grouped[dateKey][cinemaId] = [];
    }

    grouped[dateKey][cinemaId].push(session);
  });

  return grouped;
};
