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
