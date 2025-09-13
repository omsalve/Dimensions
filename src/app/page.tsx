"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from "next/image";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutSection from "../components/AboutSection";
import Teaser from "../components/Teaser";
import CSR from "../components/CSR";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // --- DESKTOP: Pinning Cinematic Transition ---
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2}`,
        },
      });
      gsap.set(teaserRef.current, { scale: 1.2, opacity: 0 });
      tl.to(heroRef.current, { scale: 0.8, opacity: 0, ease: "power2.inOut" }, 0)
        .to(teaserRef.current, { scale: 1, opacity: 1, ease: "power2.inOut" }, 0);
    });

    // --- MOBILE: Fading Cinematic Transition ---
    mm.add("(max-width: 767px)", () => {
      // Set initial state for the teaser to be invisible
      gsap.set(teaserRef.current, { autoAlpha: 0 });

      // Timeline to cross-fade between hero and teaser
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          scrub: true,
          start: "top top",
          end: "bottom top",
        }
      });
      tl.to(heroRef.current, { autoAlpha: 0, ease: 'none' })
        .from(teaserRef.current, { autoAlpha: 0, ease: 'none' }, '<');
    });

    return () => {
      mm.revert();
    }
  }, []);

  return (
    <div className="font-sans">
      {/* Container for the animation sequence */}
      <div ref={containerRef}>
        <div ref={heroRef}>
            <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
              <div className="absolute inset-0 -z-10">
                <video 
                  src="/videos/herosect.mp4"
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              <main className="z-10 flex flex-col gap-6 items-center text-center">
                <div className="relative w-full h-48 max-w-sm sm:h-100 sm:max-w-2xl">
                  <Image
                    src="/images/strokelogo.png"
                    alt="Dimensions 2025 Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="max-w-xl text-base sm:text-lg text-slate-200">
                  Step into Dimensions' 30th Pearl Jubilee at V.G. Vaze College, an exhilarating festival where youthful spirit defies the ordinary.
                </p>
              </main>
            </div>
        </div>
        <div ref={teaserRef}>
          <Teaser />
        </div>
      </div>

      <CSR />
      
      <div className="h-screen bg-black flex items-center justify-center text-center p-4">
        <h2 className="text-2xl md:text-3xl text-white">More Sections Can Go Here</h2>
      </div>
    </div>
  );
}