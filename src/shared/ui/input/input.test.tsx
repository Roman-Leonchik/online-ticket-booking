import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Input } from './input';

describe('Input component', () => {
  it('Рендер input с корректным label', () => {
    render(<Input label="Логин" placeholder="Введите логин" />);

    const label = screen.getByText('Логин');
    const input = screen.getByPlaceholderText('Введите логин');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    expect(input).toHaveAttribute('id', label.getAttribute('for'));
  });

  it('Показ ошибки', () => {
    const errorMessage = 'Обязательное введите логин';
    render(<Input error={errorMessage} placeholder="Логин" />);

    const errorSpan = screen.getByText(errorMessage);
    const input = screen.getByPlaceholderText('Логин');

    expect(errorSpan).toBeInTheDocument();
    expect(input).toHaveClass('border-error');
  });

  it('Проверка передачи ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('Проверка атрибутов', () => {
    render(<Input name="password" disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('name', 'password');
  });
});
