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
  startTime: string;
}
