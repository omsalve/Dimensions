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
  const aboutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sections = [heroRef.current, teaserRef.current, aboutRef.current];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        // The animation will complete after scrolling 3x the window height
        end: () => `+=${window.innerHeight * 3}`,
      },
    });

    // --- CINEMATIC TRANSITION TIMELINE ---

    // 1. Initial State
    // Teaser & About sections start scaled up (as if closer) and invisible
    gsap.set(teaserRef.current, { scale: 1.2, opacity: 0 });
    gsap.set(aboutRef.current, { scale: 1.2, opacity: 0 });

    // 2. Hero -> Teaser Transition
    tl.to(heroRef.current, { 
        scale: 0.8, // Scale hero down slightly to give a sense of depth
        opacity: 0, 
        ease: "power2.inOut" 
    }, 0); // Start at 0 seconds on the timeline

    tl.to(teaserRef.current, { 
        scale: 1, // Scale teaser down to its natural size
        opacity: 1, 
        ease: "power2.inOut" 
    }, 0); // Animate in at the same time

    // 3. Teaser -> About Transition
    // Start this transition halfway through the timeline's duration
    tl.to(teaserRef.current, { 
        scale: 0.8, // Scale teaser down
        opacity: 0, 
        ease: "power2.inOut" 
    }, 1); // Start at 1 second on the timeline

    tl.to(aboutRef.current, { 
        scale: 1, // Scale about section to its natural size
        opacity: 1, 
        ease: "power2.inOut" 
    }, 1); // Animate in at the same time as the teaser fades

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, []);

  return (
    <div className="font-sans">
      {/* Main container for the pinned animation */}
      <div ref={containerRef} className="relative h-screen">
        {/* Each section is positioned absolutely to stack on top of each other */}
        <div ref={heroRef} className="absolute inset-0">
          <div className="relative flex flex-col items-center justify-center min-h-screen p-8 overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <video 
                src="/videos/herosect.mp4"
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <main className="z-10 flex flex-col gap-8 items-center text-center">
              <div className="relative w-full h-100 max-w-lg sm:max-w-2xl">
                <Image
                  src="/images/strokelogo.png"
                  alt="Dimensions 2025 Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="max-w-2xl text-lg text-slate-200">
                Step into Dimensions' 30th Pearl Jubilee at V.G. Vaze College, an exhilarating festival where youthful spirit defies the ordinary. <br />

Witness the brilliance of 120+ colleges in over 30 events, joining 20,000+ attendees for two thrilling days in the heart of Mumbai. <br />

Experience a legacy of excellence and unforgettable moments, fueled by the passion of a 600+ member team. <br />
              </p>
            </main>
          </div>
        </div>

        <div ref={teaserRef} className="absolute inset-0">
          <Teaser />
        </div>

        <div ref={aboutRef} className="absolute inset-0">
          <AboutSection />
        </div>
      </div>

      {/* The CSR section and other content now follow in the normal document flow */}
      <CSR />
      
      {/* Placeholder for even more content */}
      <div className="h-screen bg-black flex items-center justify-center">
        <h2 className="text-3xl text-white">More Sections Can Go Here</h2>
      </div>
    </div>
  );
}