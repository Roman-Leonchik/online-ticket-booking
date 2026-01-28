import { Metadata } from 'next';
import { MoviesPage } from '@/pages/movies/ui/Page';

export const metadata: Metadata = {
  title: 'Каталог фильмов | CinemaBooking',
  description: 'Выбор фильмов онлайн',
};

export default function Movies() {
  return <MoviesPage />;
}
