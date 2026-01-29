import { render, screen } from '@testing-library/react';
import { NavLink } from './nav-link';
import { usePathname } from 'next/navigation';
import { vi, describe, it, expect, type Mock } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('NavLink component', () => {
  it('Активный пункт меню', () => {
    (usePathname as Mock).mockReturnValue('/movies');

    render(<NavLink label="Фильмы" href="/movies" />);

    const link = screen.getByRole('link');
    expect(link.className).toContain('border-white');
  });

  it('Не активнй пункт меню', () => {
    (usePathname as Mock).mockReturnValue('/cinema');

    render(<NavLink label="Фильмы" href="/movies" />);

    const link = screen.getByRole('link');
    expect(link.className).toContain('border-white/0');
  });
});
