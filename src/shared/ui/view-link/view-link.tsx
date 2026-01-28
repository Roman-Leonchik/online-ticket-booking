'use client';

import Link from 'next/link';
import { ViewItem } from '@shared/types/navigation';

export const ViewLink = ({ text = 'Посмотреть сеансы', href }: ViewItem) => {
  return (
    <Link
      href={href}
      className="flex rounded-lg border p-3 text-lg transition-all hover:bg-gray-500/50"
    >
      {text}
    </Link>
  );
};
