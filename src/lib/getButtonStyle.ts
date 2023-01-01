export type ButtonVariant = 'primary' | 'secondary';

export function getButtonStyle(variant: ButtonVariant, active = false) {
  const baseStyle = `block text-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 ${
    active ? 'bg-orange-300' : ''
  }`;
  const primaryStyle = 'bg-orange-300 hover:bg-orange-500';
  const secondaryStyle = 'bg-orange-400 hover:bg-orange-300';

  if (variant === 'primary') {
    return `${baseStyle} ${primaryStyle}`;
  }

  if (variant === 'secondary') {
    return `${baseStyle} ${secondaryStyle}`;
  }

  return baseStyle;
}
