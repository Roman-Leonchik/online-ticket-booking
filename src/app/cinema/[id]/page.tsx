import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCinemas } from '@/shared/api/cinemas';
import { CinemaDetailsPage } from '@/pages/cinema-details/ui/Page';

interface CinemaProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const cinemas = await getCinemas();

    return cinemas.map((cinema) => ({
      id: cinema.id.toString(),
    }));
  } catch (error) {
    console.error('Failed:', error);
    return [];
  }
}

export async function generateMetadata({ params }: CinemaProps): Promise<Metadata> {
  const { id } = await params;
  const cinemas = await getCinemas().catch(() => []);
  const cinema = cinemas.find((item) => item.id.toString() === id);

  if (!cinema) {
    return { title: 'Кинотеатр не найден' };
  }

  return {
    title: cinema.name,
    description: `Кинотеатр - ;${cinema.name}. По адрессу - ${cinema.address}`,
  };
}

export default async function Cinema({ params }: CinemaProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <CinemaDetailsPage id={id} />;
}
