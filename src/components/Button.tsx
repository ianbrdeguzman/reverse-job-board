import { ButtonType, getButtonLinkStyle } from '../lib/getButtonLinkStyle';

interface ButtonProps {
  type: ButtonType;
  name: string;
}

export function Button({ type, name }: ButtonProps) {
  return <div className={getButtonLinkStyle(type)}>{name}</div>;
}
