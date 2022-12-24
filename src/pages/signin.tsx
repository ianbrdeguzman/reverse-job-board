import React from 'react';
import Link from 'next/link';
import { config } from '../config';
import { useRouter } from 'next/router';
import { auth } from '../firebase/client';
import { GetServerSidePropsContext } from 'next';
import { setCookie, hasCookie } from 'cookies-next';
import { validateInputs } from '../lib/validateInputs';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';

export default function SignInPage() {
  const { push } = useRouter();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  });
  const {
    mutate: signIn,
    isLoading,
    isSuccess,
    isError
  } = useAuthSignInWithEmailAndPassword(auth);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs(inputs)) {
      return;
    }

    signIn(
      { email: inputs.email.trim(), password: inputs.password.trim() },
      {
        onSuccess: async ({ user }) => {
          const token = await user.getIdToken();
          setCookie(config.cookie.auth, token);
          push('/');
        }
      }
    );
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
                value={inputs.email}
                onChange={handleOnChange}
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
                value={inputs.password}
                onChange={handleOnChange}
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
              {isLoading || isSuccess ? 'Loading...' : 'Sign in'}
            </button>
          </div>
        </form>
        {isError && (
          <p className="mt-2 text-sm text-center text-red-500 italic">
            Invalid email address or password
          </p>
        )}
      </div>
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  if (hasCookie(config.cookie.auth, context)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
