import { Metadata } from 'next';
import { AuthPage } from '@pages/auth/ui';

export const metadata: Metadata = {
  title: 'Авторизация',
  description: 'Авторизация в платформу',
};

export default function Auth() {
  return <AuthPage />;
}
