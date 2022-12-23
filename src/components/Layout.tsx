import React from 'react';
import { Navbar } from './Navbar';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}