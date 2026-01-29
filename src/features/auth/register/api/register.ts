import { apiFetch } from '@/shared/api/base';
import { RegisterFormData } from '../model/register-schema';

interface RegisterResponse {
  token: string;
}

export const regsiterRequest = async (data: RegisterFormData): Promise<RegisterResponse> => {
  return apiFetch('/register', {
    method: 'POST',
    body: JSON.stringify({
      username: data.login,
      password: data.password,
    }),
  });
};
