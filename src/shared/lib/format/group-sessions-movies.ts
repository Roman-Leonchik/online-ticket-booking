import { MovieSessionsResponse } from '@/shared/types/movies';
import { formatDate } from './date';

type SessionsByCinema = Record<string, MovieSessionsResponse[]>;

type GroupedByDateAndCinema = Record<string, SessionsByCinema>;

export const groupSessionsByDateAndCinema = (
  sessions: MovieSessionsResponse[],
): GroupedByDateAndCinema => {
  return sessions.reduce((acc: GroupedByDateAndCinema, session) => {
    const dateKey = formatDate(session.startTime);
    const cinemaId = session.cinemaId.toString();

    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }

    if (!acc[dateKey][cinemaId]) {
      acc[dateKey][cinemaId] = [];
    }

    acc[dateKey][cinemaId].push(session);
    return acc;
  }, {});
};
