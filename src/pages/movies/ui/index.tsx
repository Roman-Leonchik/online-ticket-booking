import { getMovies } from '@/shared/api/movies';
import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { TextError } from '@/shared/ui/text-error';

export const MoviesPage = async () => {
  const movies = await getMovies();

  return (
    <>
      <div className="mx-auto flex w-full max-w-275 flex-col gap-6">
        <div className="grid grid-cols-5 gap-4 border-b-2 p-4 text-xl">
          <span className="col-span-2 text-right">Название</span>
          <span className="text-center">Продолжительность</span>
          <span className="col-span-2 text-left">Рейтинг</span>
        </div>
        <ul className="flex flex-col justify-center gap-6">
          {movies.map((item) => (
            <li key={item.id}>
              <MovieCard {...item} />
            </li>
          ))}
        </ul>
      </div>
      {movies.length === 0 && <TextError text="Фильмы не найдены" />}
    </>
  );
};
