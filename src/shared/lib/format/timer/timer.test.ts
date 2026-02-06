import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateTimeLeft } from './timer';

describe('calculateTimeLeft', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-29T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Вернет 120 секунд, если бронь была минуту назад и время брони 180 сек', () => {
    const bookedAt = '2026-01-29T11:59:00Z';
    const lifeTime = 180;
    expect(calculateTimeLeft(bookedAt, lifeTime)).toBe(120);
  });

  it('Вернет 0, если время закончилось', () => {
    const bookedAt = '2026-01-29T11:00:00Z';
    const lifeTime = 180;
    expect(calculateTimeLeft(bookedAt, lifeTime)).toBe(0);
  });
});
