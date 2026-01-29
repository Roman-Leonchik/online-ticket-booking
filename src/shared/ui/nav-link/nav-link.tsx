'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { NavItem } from '@shared/types/navigation';

export const NavLink = ({ label, href }: NavItem) => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex w-full border-t border-b border-white/0 p-4 text-2xl transition-all duration-300',
        isActive ? 'border-white bg-gray-500/30' : 'hover:bg-gray-500/10',
      )}
    >
      {label}
    </Link>
  );
};
