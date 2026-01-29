import { ViewLink } from '@/shared/ui/view-link';

interface CinemasCardProps {
  id: number;
  name: string;
  address: string;
}

export const CinemasCard = ({ id, name, address }: CinemasCardProps) => {
  return (
    <div className="grid grid-cols-3 items-center gap-4 text-xl">
      <span>{name}</span>
      <span>{address}</span>
      <div className="ml-auto">
        <ViewLink href={`/cinema/${id}`} />
      </div>
    </div>
  );
};
