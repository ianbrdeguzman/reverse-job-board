import { SignInInputs } from '../pages/signin';
import React, { HTMLInputTypeAttribute } from 'react';
import { Path, UseFormRegister, Validate } from 'react-hook-form';
import type { RegisterInputs } from '../pages/register';

interface InputProps {
  label: string;
  name: Path<SignInInputs | RegisterInputs>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegister<SignInInputs | RegisterInputs>;
  required: boolean;
  validate?: Validate<string | undefined>;
  error?: string;
}

export function Input({
  label,
  name,
  type,
  placeholder,
  register,
  required = false,
  validate,
  error
}: InputProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="block w-full appearance-none rounded-md border border-gray-300 my-1 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-400 focus:outline-none focus:ring-orange-400 sm:text-sm shadow-sm"
        placeholder={placeholder}
        {...register(name, {
          required,
          maxLength: {
            value: 50,
            message: error ?? ''
          },
          validate
        })}
      />
      {error && (
        <p className="text-xs absolute bottom-0 right-1 text-red-500 italic z-10">
          {error}
        </p>
      )}
    </div>
  );
}
