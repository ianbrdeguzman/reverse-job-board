import React from 'react';
import Link from 'next/link';
import { config } from '../config';
import { hasCookie } from 'cookies-next';
import { auth } from '../firebase/client';
import { GetServerSidePropsContext } from 'next';
import { validateInputs } from '../lib/validateInputs';
import {
  useAuthSignOut,
  useAuthCreateUserWithEmailAndPassword
} from '@react-query-firebase/auth';

export default function RegisterPage() {
  const {
    mutate: register,
    isLoading,
    isSuccess,
    isError
  } = useAuthCreateUserWithEmailAndPassword(auth);

  const { mutate: signOut } = useAuthSignOut(auth);
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    ['confirm-password']: ''
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputs.password !== inputs['confirm-password']) {
      return;
    }

    if (!validateInputs(inputs)) {
      return;
    }

    register(
      { email: inputs.email.trim(), password: inputs.password.trim() },
      {
        onSuccess: () => {
          signOut();
          setInputs({ email: '', password: '', 'confirm-password': '' });
        }
      }
    );
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {`Or `}
            <Link
              href="/signin"
              className="font-medium text-orange-500 hover:text-orange-400"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
          <div className=" rounded-md shadow-sm">
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
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
                value={inputs.password}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Confirm password"
                value={inputs['confirm-password']}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </div>
        </form>
        {isSuccess && (
          <p className="mt-2 text-sm text-center text-green-500">
            Registration successful
          </p>
        )}
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
