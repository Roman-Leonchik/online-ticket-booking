import { SessionPage } from '@/pages/session-details/ui/Page';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <SessionPage sessionId={id} />;
}
