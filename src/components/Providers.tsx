import { AuthProvider } from '../context/Auth';

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
