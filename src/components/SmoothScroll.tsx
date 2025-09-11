"use client";

import { useEffect, createContext, useContext, useState } from 'react';
import Lenis from '@studio-freight/lenis';

// Create a context to provide the Lenis instance
export const LenisContext = createContext<Lenis | null>(null);

// Create a custom hook for easy access to the context
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const newLenis = new Lenis();
    setLenis(newLenis);

    // Animation frame loop
    function raf(time: number) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}