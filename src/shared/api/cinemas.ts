import { apiFetch } from './base';

export interface CinemasResponse {
  id: number;
  name: string;
  address: string;
}

export interface CinemasSessionsResponse {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}

export const getCinemas = async (): Promise<CinemasResponse[]> => {
  return apiFetch('/cinemas', {
    method: 'GET',
    next: {
      revalidate: 3600,
    },
  });
};

export const getCinemasSessionsById = async (id: string): Promise<CinemasSessionsResponse[]> => {
  return apiFetch(`/cinemas/${id}/sessions`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });
};
