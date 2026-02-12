import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { useLenis } from '../hooks/useLenis';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useLenis();

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        style={{
          paddingTop: 'var(--header-height)',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
