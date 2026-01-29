const dateFullFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
});

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

export const formatDate = (date: string | Date): string => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return dateFullFormatter.format(checkDate);
};

export const formatDateByTime = (date: string | Date): string => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return timeFormatter.format(checkDate);
};

export const formatFullDateTime = (date: string | Date): string => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(checkDate)}, ${formatDateByTime(checkDate)}`;
};
