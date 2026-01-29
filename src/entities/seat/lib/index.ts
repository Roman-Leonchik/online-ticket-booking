export const getSeatKey = (row: number, col: number) => `${row}-${col}`;

export const parseSeatKey = (key: string) => {
  const [row, seat] = key.split('-').map(Number);

  return {
    rowNumber: row,
    seatNumber: seat,
  };
};

export const parseSeatKeysToObjects = (keys: string[]) => {
  return keys.map(parseSeatKey);
};
