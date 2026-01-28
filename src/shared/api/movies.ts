import { apiFetch } from './base';

export interface MoviesResponse {
  id: number;
  title: string;
  description: string;
  year: number;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}

export interface MovieSessionsResponse {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: Date;
}

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
