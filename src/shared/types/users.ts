import { Seat } from './session';

export interface BookingsResponse {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: string;
  seats: Seat[];
  isPaid: boolean;
}
