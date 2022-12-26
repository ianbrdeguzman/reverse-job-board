import React from 'react';
import { Navbar } from './Navbar';
import { nunito } from '../pages/_app';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <main className={nunito.className}>
      <Navbar />
      {children}
    </main>
  );
}
