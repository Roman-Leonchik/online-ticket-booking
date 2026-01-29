import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cookies from 'js-cookie';
import { ButtonExit } from './button-exit';

vi.mock('js-cookie', () => ({
  default: {
    remove: vi.fn(),
  },
}));

describe('ButtonExit component', () => {
  const mockLocation = {
    href: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';

    vi.stubGlobal('location', mockLocation);
  });

  it('должен удалять куку и делать редирект при клике', () => {
    render(<ButtonExit />);

    const button = screen.getByRole('button', { name: /выход/i });

    fireEvent.click(button);

    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token');

    expect(window.location.href).toBe('/movies');
  });
});
