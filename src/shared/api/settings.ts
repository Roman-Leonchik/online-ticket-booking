import { apiFetch } from './base';

export interface SettingsResponse {
  bookingPaymentTimeSeconds: number;
}

export const getSettings = async (): Promise<SettingsResponse> => {
  return apiFetch('/settings', {
    method: 'GET',
  });
};
