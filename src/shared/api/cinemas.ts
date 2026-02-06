import { apiFetch } from './base';
import { CinemasResponse, CinemasSessionsResponse } from '../types/cinemas';

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
