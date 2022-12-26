import { AuthProvider } from '../context/auth';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* other providers... */}
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
