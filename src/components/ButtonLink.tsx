import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonVariant, getButtonStyle } from '../lib/getButtonStyle';

interface ButtonLinkProps {
  variant: ButtonVariant;
  href: string;
  name: string;
}

export function ButtonLink({ variant, href, name }: ButtonLinkProps) {
  const { asPath } = useRouter();
  const active = asPath.slice(1) === name.toLowerCase();

  return (
    <Link href={href} className={getButtonStyle(variant, active)}>
      {name}
    </Link>
  );
}
