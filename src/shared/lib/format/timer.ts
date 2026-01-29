export const calculateTimeLeft = (bookedAt: string, bookingPaymentTimeSeconds: number): number => {
  const bookedTime = new Date(bookedAt).getTime();
  const currentTime = new Date().getTime();

  const expirationTime = bookedTime + bookingPaymentTimeSeconds * 1000;

  const diff = Math.floor((expirationTime - currentTime) / 1000);

  return diff > 0 ? diff : 0;
};
