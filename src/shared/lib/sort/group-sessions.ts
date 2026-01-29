import { formatDate } from '@/shared/lib/format/date';

interface BaseSession {
  startTime: string;
}

export const getGroupedSessions = <T extends BaseSession>(sessions: T[], groupKey: keyof T) => {
  const sorted = [...sessions].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  const grouped: Record<string, Record<string, T[]>> = {};

  sorted.forEach((session) => {
    const dateKey = formatDate(session.startTime.toString());
    const subKey = String(session[groupKey]);

    if (!grouped[dateKey]) {
      grouped[dateKey] = {};
    }

    if (!grouped[dateKey][subKey]) {
      grouped[dateKey][subKey] = [];
    }

    grouped[dateKey][subKey].push(session);
  });

  return grouped;
};
