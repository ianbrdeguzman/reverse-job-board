import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavbarLinkProps {
  href: string;
  name: string;
}

export function NavbarLink({ href, name }: NavbarLinkProps) {
  const { asPath } = useRouter();
  const active = asPath.slice(1) === name;

  return (
    <Link
      href={href}
      className={`flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 capitalize ${
        active ? 'bg-orange-300' : ''
      }`}
    >
      {name}
    </Link>
  );
}
