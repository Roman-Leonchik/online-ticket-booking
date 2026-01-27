import { apiFetch } from '@/shared/api/base';
import { LoginFormData } from '../model/login-schema';

interface LoginResponse {
  token: string;
}

export const loginRequest = async (data: LoginFormData): Promise<LoginResponse> => {
  return apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      username: data.login,
      password: data.password,
    }),
  });
};
