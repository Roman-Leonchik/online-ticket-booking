import { NavLink } from '@shared/ui/nav-link';
import { NavItem } from '@shared/types/navigation';
import { ButtonExit } from '@/shared/ui/button-exit';

interface NavbarProps {
  isAuth: boolean;
}

const navItems: NavItem[] = [
  { label: 'Фильмы', href: '/' },
  { label: 'Кинотеатры', href: '/cinema' },
  { label: 'Мои билеты', href: '/tickets' },
];

const entranceItem: NavItem = {
  label: 'Вход',
  href: '/auth',
};

export const Navbar = ({ isAuth }: NavbarProps) => {
  return (
    <nav>
      <ul className="mt-8 mb-8 flex flex-col">
        {navItems.map((item) => (
          <li className="flex" key={item.href}>
            <NavLink {...item} />
          </li>
        ))}
        {isAuth ? (
          <li className="flex">
            <ButtonExit />
          </li>
        ) : (
          <li className="flex">
            <NavLink {...entranceItem} />
          </li>
        )}
      </ul>
    </nav>
  );
};
