import { Metadata } from 'next';
import { TicketsPage } from '@/pages/tickets/ui/Page';

export const metadata: Metadata = {
  title: 'Билеты',
  description: 'Выбор билетов на сеанс',
};

export default function Tickets() {
  return <TicketsPage />;
}
