import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { config } from '../config';

interface ProtectedPageProps {
  children: React.ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const { push } = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      push(config.routes.home);
    }
  }, [user]);

  return <>{children}</>;
}
