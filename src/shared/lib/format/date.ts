const LOCALE = 'ru-RU';

const dateFullFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: '2-digit',
  month: '2-digit',
});

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
});

const fullDateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const checkDate = (date: string | Date): Date => (date instanceof Date ? date : new Date(date));

export const formatDate = (date: string | Date) => dateFullFormatter.format(checkDate(date));

export const formatDateByTime = (date: string | Date) => timeFormatter.format(checkDate(date));

export const formatFullDateTime = (date: string | Date): string => {
  const newDate = checkDate(date);
  return fullDateTimeFormatter.format(newDate).replace(' ', ', ');
};
