import Link from 'next/link';
import { useEffect } from 'react';
import { config } from '../config';
import { getCookie } from 'cookies-next';
import { auth } from '../firebase/admin';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { GetServerSidePropsContext } from 'next';
import { FormHeader } from '../components/FormHeader';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface SignInInputs {
  email: string;
  password: string;
}

export default function SignInPage() {
  const { signIn, isLoading, isError, reset } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInInputs>();

  const handleOnSubmit: SubmitHandler<SignInInputs> = ({ email, password }) => {
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
            <Input
              label="Email address"
              name="email"
              placeholder="Email address"
              type="email"
              register={register}
              required
              error={errors && errors.email?.message}
            />
            <Input
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              register={register}
              required
              error={errors && errors.password?.message}
            />
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
