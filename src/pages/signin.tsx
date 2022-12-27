import Link from 'next/link';
import { useEffect } from 'react';
import { config } from '../config';
import { getCookie } from 'cookies-next';
import { auth } from '../firebase/admin';
import { useAuth } from '../hooks/useAuth';
import { GetServerSidePropsContext } from 'next';
import { FormHeader } from '../components/FormHeader';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface Inputs {
  email: string;
  password: string;
}

export default function SignInPage() {
  const { signIn, isLoading, isError, reset } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const handleOnSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signIn(email, password);
  };

  useEffect(() => {
    return reset;
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full mx-2 max-w-md">
        <FormHeader
          title="Sign in to your account"
          linkHref={config.routes.register}
          linkText="Or register a new account"
        />
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="-space-y-px rounded-md">
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
                {...register('email', {
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
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm shadow-sm"
                placeholder="Password"
                {...register('password', {
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
          </div>
          <Link
            href="/forgot-password"
            className="mt-2 text-sm font-medium text-orange-400 hover:text-orange-500"
          >
            Forgot your password?
          </Link>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
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
