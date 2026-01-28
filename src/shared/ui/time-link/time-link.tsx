'use client';

import Link from 'next/link';
import { TimeItem } from '@shared/types/navigation';

export const TimeLink = ({ time, href }: TimeItem) => {
  return (
    <Link
      href={href}
      className="flex rounded-lg border p-4 text-xl transition-all hover:bg-gray-500/50"
    >
      {time}
    </Link>
  );
};
