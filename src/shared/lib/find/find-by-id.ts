export const findById = <T extends { id: string | number }>(
  items: T[],
  id: string | number,
): T | undefined => {
  return items.find((item) => String(item.id) === String(id));
};
