import Link from 'next/link';
import { useRouter } from 'next/router';

type ButtonLinkType = 'primary' | 'secondary';

interface ButtonLinkProps {
  type: ButtonLinkType;
  href: string;
  name: string;
}

function getButtonLinkStyle(type: ButtonLinkType, active = false) {
  const baseStyle = `block text-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 ${
    active ? 'bg-orange-300' : ''
  }`;
  const primaryStyle = 'bg-orange-300 hover:bg-orange-500';
  const secondaryStyle = 'bg-orange-400 hover:bg-orange-300';

  if (type === 'primary') {
    return `${baseStyle} ${primaryStyle}`;
  }

  if (type === 'secondary') {
    return `${baseStyle} ${secondaryStyle}`;
  }

  return baseStyle;
}

export function ButtonLink({ type, href, name }: ButtonLinkProps) {
  const { asPath } = useRouter();
  const active = asPath.slice(1) === name.toLowerCase();

  return (
    <Link href={href} className={getButtonLinkStyle(type, active)}>
      {name}
    </Link>
  );
}
