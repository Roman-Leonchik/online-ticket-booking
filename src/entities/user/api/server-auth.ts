import { cookies } from 'next/headers';

export async function getIsAuthServer() {
  const cookieStore = await cookies();

  return cookieStore.has('jwt_token');
}
