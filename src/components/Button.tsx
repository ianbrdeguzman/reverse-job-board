import { ButtonVariant, getButtonStyle } from '../lib/getButtonStyle';

interface ButtonProps {
  type: 'button' | 'submit';
  variant: ButtonVariant;
  name: string;
}

export function Button({ type, variant, name }: ButtonProps) {
  return (
    <button type={type} className={getButtonStyle(variant)}>
      {name}
    </button>
  );
}
