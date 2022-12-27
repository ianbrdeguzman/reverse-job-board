import { config } from '../config';
import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { auth } from '../firebase/admin';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { GetServerSidePropsContext } from 'next';
import { FormHeader } from '../components/FormHeader';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface RegisterInputs {
  email: string;
  password: string;
  'confirm-password'?: string;
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

  console.log(errors);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full mx-2 max-w-md">
        <FormHeader
          title="Register an account"
          linkHref={config.routes.signin}
          linkText="Or sign in to your account"
        />
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className=" rounded-md shadow-sm">
            <Input
              label="Email address"
              name="email"
              placeholder="Email address"
              type="email"
              register={registerInput}
              required
              error={errors && errors.email?.message}
            />
            <Input
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              register={registerInput}
              required
              error={errors && errors.password?.message}
            />
            <Input
              label="Confirm password"
              name="confirm-password"
              placeholder="Confirm password"
              type="password"
              register={registerInput}
              required
              validate={(value) =>
                value !== watch('password')
                  ? 'Passwords does not match'
                  : undefined
              }
              error={errors && errors['confirm-password']?.message}
            />
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
