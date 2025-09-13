"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealTextProps = {
  text: string;
  className?: string;
};

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ text, className }) => {
  const textContainerRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const textContainer = textContainerRef.current;
    if (!textContainer) return;

    // Split the paragraph into words and wrap each in a span
    const words = text.split(' ').map(word => {
      const span = document.createElement('span');
      // FIX: Add a space after each word for proper spacing
      span.textContent = word + ' '; 
      span.className = 'inline-block';
      return span;
    });

    textContainer.innerHTML = '';
    words.forEach(word => textContainer.appendChild(word));

    gsap.to(words, {
      color: '#FFFFFF',
      opacity: 1,
      // FIX: Increased stagger for a slower, more deliberate word-by-word reveal
      stagger: 0.5, 
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: textContainer,
        start: 'top 70%',
        end: 'bottom 80%',
        // FIX: Increased scrub value to make the animation feel slower and smoother
        scrub: 2, 
      },
    });

  }, [text]);

  return (
    <p
      ref={textContainerRef}
      className={`${className} text-slate-600 opacity-50`}
    >
      {/* GSAP will populate this element */}
    </p>
  );
};

export default ScrollRevealText;