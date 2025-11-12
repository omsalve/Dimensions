// src/components/PersistentHeader.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function PersistentHeader() {
  return (
    <header className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 pointer-events-none">
      {/* This is the target wrapper for our animation.
        It starts invisible with 'opacity-0'.
        The 'pointer-events-auto' on the Link makes *only* the logo clickable.
      */}
      <div 
        id="header-logo-wrapper" 
        className="relative w-28 h-10 sm:w-32 sm:h-12 opacity-0"
      >
        <Link href="/" aria-label="Go to homepage" className="pointer-events-auto">
          <Image
            src="/images/strokelogo.png"
            alt="Dimensions Logo"
            fill
            className="object-contain object-left" // Align to the left
            priority
          />
        </Link>
      </div>
    </header>
  );
}