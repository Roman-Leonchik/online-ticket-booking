export const withBase = (path: string) => {
  const basePath = '/online-ticket-booking';
  if (path.startsWith(basePath) || path.startsWith('http')) return path;

  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
};
