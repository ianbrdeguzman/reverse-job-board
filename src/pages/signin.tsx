import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import { auth } from '../firebase/admin';

export default function SignInPage() {
  const { signIn, isLoading, isError } = useAuth();

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('ian@test.com', 'asdasd');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              register a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Forgot your password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
        </form>
        {isError && <p>Invalid email or password</p>}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = getCookie('rjb-auth', context) as string;

  if (!token) {
    return {
      props: {}
    };
  }
  try {
    await auth.verifyIdToken(token);

    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {}
    };
  }
}
