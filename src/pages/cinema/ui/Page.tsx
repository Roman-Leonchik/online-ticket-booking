import { getCinemas } from '@/shared/api/cinemas';
import { TextError } from '@/shared/ui/text-error';
import { CinemasCard } from '@/entities/cinemas/ui/CinemasCard';

export const CinemaPage = async () => {
  const cinemas = await getCinemas();

  return (
    <>
      <div className="mx-auto flex w-full max-w-275 flex-col gap-6">
        <div className="grid grid-cols-3 gap-4 border-b-2 p-4 text-xl">
          <span>Кинотеатр</span>
          <span>Адрес</span>
        </div>
        <ul className="flex flex-col justify-center gap-6 px-4">
          {cinemas.map((item) => (
            <li key={item.id}>
              <CinemasCard {...item} />
            </li>
          ))}
        </ul>
      </div>
      {cinemas.length === 0 && <TextError text="Кинотеатры не найдены" />}
    </>
  );
};
