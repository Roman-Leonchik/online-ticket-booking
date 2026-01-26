import { NavLink } from '@shared/ui/nav-link';
import { NavItem } from '@shared/types/navigation';

const navItems: NavItem[] = [
  { label: 'Фильмы', href: '/' },
  { label: 'Кинотеатры', href: '/cinema' },
  { label: 'Мои билеты', href: '/tickets' },
  { label: 'Вход', href: '/auth' },
];

export const Navbar = () => {
  return (
    <nav>
      <ul className="mt-8 mb-8 flex flex-col">
        {navItems.map((item) => (
          <li className="flex">
            <NavLink key={item.href} {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
