import { useState, useEffect, useRef } from 'react';

export function useComponentVisible<T extends HTMLElement>(isVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(isVisible);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
