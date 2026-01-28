export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
  });

  return formatter.format(date);
};

export const formatDateByTime = (dateString: Date): string => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return formatter.format(date);
};
