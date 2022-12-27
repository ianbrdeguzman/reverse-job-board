import Link from 'next/link';
import { config } from '../config';
import type { Inputs } from './signin';
import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { auth } from '../firebase/admin';
import { useAuth } from '../hooks/useAuth';
import { GetServerSidePropsContext } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';

interface RegisterInputs extends Inputs {
  'confirm-password': string;
}

export default function RegisterPage() {
  const { register, isLoading, isError, isSuccess, reset } = useAuth();
  const {
    register: registerInput,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterInputs>();

  const handleOnSubmit: SubmitHandler<RegisterInputs> = ({
    email,
    password
  }) => {
    register(email, password);
  };

  useEffect(() => {
    return reset;
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">
            Register an account
          </h2>
          <Link
            className="block mt-2 text-center text-sm font-medium text-orange-400 hover:text-orange-500"
            href={config.routes.signin}
          >
            Or sign in to your account
          </Link>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className=" rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm shadow-sm"
                placeholder="Email address"
                {...registerInput('email', {
                  required: true,
                  maxLength: {
                    value: 50,
                    message: 'Maxiumum length is 50 characters'
                  }
                })}
              />
              {errors.email && (
                <p className="text-xs absolute bottom-0 right-1 text-red-500 italic z-10">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm shadow-sm"
                placeholder="Password"
                {...registerInput('password', {
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Minimum length is 6 characters'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum password length is 20 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="text-xs absolute bottom-0 right-1 text-red-500 italic z-10">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Confirm password"
                {...registerInput('confirm-password', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return 'Password does not match';
                    }
                  }
                })}
              />
              {errors['confirm-password'] && (
                <p className="text-xs absolute bottom-0 right-1 text-red-500 italic z-10">
                  {errors['confirm-password'].message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
        {isSuccess && (
          <p className="text-xs text-center mt-1 text-green-500 italic z-10">
            Registered successfully
          </p>
        )}
        {isError && (
          <p className="text-xs text-center mt-1 text-red-500 italic z-10">
            Invalid email or password
          </p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = getCookie(config.cookie.token, context) as string;

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
        destination: config.routes.home
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {}
    };
  }
}
