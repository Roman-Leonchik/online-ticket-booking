export interface Seats {
  rows: number;
  seatsPerRow: number;
}

export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface MovieSessionsResponse {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: Seats;
  bookedSeats: Seat[];
}

export interface MovieBookingsResponse {
  bookingId: string;
}

export interface MovieBookingsRequest {
  seats: Seat[];
}
