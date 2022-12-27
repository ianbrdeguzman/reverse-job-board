import Link from 'next/link';

interface FormHeaderProps {
  title: string;
  linkHref: string;
  linkText: string;
}

export function FormHeader({ title, linkHref, linkText }: FormHeaderProps) {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">
        {title}
      </h2>
      <Link
        className="block mt-2 text-center text-sm font-medium text-orange-400 hover:text-orange-500"
        href={linkHref}
      >
        {linkText}
      </Link>
    </div>
  );
}
