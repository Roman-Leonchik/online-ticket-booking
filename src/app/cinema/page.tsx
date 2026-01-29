import { Metadata } from 'next';
import { CinemaPage } from '@/pages/cinema/ui/Page';

export const metadata: Metadata = {
  title: 'Кинотеатры',
  description: 'Выбор кинотеатров твоего города',
};

export default function Cinema() {
  return <CinemaPage />;
}
