import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { useLenis } from '../hooks/useLenis';
import { getLenis } from '../hooks/useLenis';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useLenis();
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
