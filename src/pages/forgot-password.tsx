import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { FormHeader } from '../components/FormHeader';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
}

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, isError, isSuccess } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const handleOnSubmit: SubmitHandler<Inputs> = ({ email }) => {
    forgotPassword(email);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full mx-2 max-w-md">
        <FormHeader title="Forgot your password?" linkHref="" linkText="" />
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="-space-y-px rounded-md">
            <Input<Inputs>
              label="Email address"
              name="email"
              placeholder="Email address"
              type="email"
              register={register}
              required
              error={errors && errors.email?.message}
            />
          </div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? 'Loading...' : 'Reset password'}
          </button>
        </form>
        {isSuccess && (
          <p className="text-xs text-center mt-1 text-green-500 italic z-10">
            Reset password email sent
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
