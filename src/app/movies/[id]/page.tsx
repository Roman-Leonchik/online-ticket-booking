import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovies } from '@/shared/api/movies';
import { MovieDetailsPage } from '@/pages/movie-details/ui/Page';

interface MovieProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const movies = await getMovies();

    return movies.map((movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error('Failed:', error);
    return [];
  }
}

export async function generateMetadata({ params }: MovieProps): Promise<Metadata> {
  const { id } = await params;
  const movies = await getMovies().catch(() => []);
  const movie = movies.find((item) => item.id.toString() === id);

  if (!movie) {
    return { title: 'Фильм не найден' };
  }

  return {
    title: `${movie.title} (${movie.year})`,
    description: movie.description,
  };
}

export default async function Movie({ params }: MovieProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <MovieDetailsPage id={id} />;
}
