import { ViewLink } from '@/shared/ui/view-link';
import Image from 'next/image';
import { API_URL } from '@/shared/api/base';
import { formatTime } from '@/shared/lib/format/time';

interface MovieCardProps {
  id: number;
  title: string;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}

export const MovieCard = ({ id, title, lengthMinutes, posterImage, rating }: MovieCardProps) => {
  return (
    <div className="grid grid-cols-5 items-center gap-4">
      <div className="col-span-2 grid grid-cols-2 items-center gap-4">
        <Image
          src={`${API_URL}${posterImage}`}
          alt={title}
          width={30}
          height={45}
          className="ml-auto h-auto w-7.5 object-cover"
          unoptimized
        />
        <span>{title}</span>
      </div>
      <span className="text-center">{formatTime(lengthMinutes)}</span>
      <div className="col-span-2 flex items-center gap-4">
        <span className="w-12.5">{rating}</span>
        <ViewLink href={`/movies/${id}`} />
      </div>
    </div>
  );
};
