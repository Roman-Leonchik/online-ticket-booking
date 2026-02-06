import { apiFetch } from './base';
import { MoviesResponse, MovieSessionsResponse } from '../types/movies';

export const getMovies = async (): Promise<MoviesResponse[]> => {
  return apiFetch('/movies', {
    method: 'GET',
    next: {
      revalidate: 3600,
    },
  });
};

export const getMovieSessionsById = async (id: string): Promise<MovieSessionsResponse[]> => {
  return apiFetch(`/movies/${id}/sessions`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });
};
