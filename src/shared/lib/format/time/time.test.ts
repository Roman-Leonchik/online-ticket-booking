import { describe, it, expect } from 'vitest';
import { formatTime } from './time';

describe('formatTime', () => {
  it('Переводит 142 минуты в 2:22', () => {
    expect(formatTime(142)).toBe('2:22');
  });

  it('Добавляет ноль, если меньше 10 минут', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('Если меньше одного часа', () => {
    expect(formatTime(45)).toBe('0:45');
  });
});
