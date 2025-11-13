"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from "next/image";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutSection from "../components/AboutSection";
import Teaser from "../components/Teaser";
import CSR from "../components/CSR";
import SponsorSection from '../components/SponsorSection'; // Import the SponsorSection
import ContactUs from "../components/ContactUs";
import Events from '@/components/EventsSection';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // --- DESKTOP ANIMATION (screens wider than 768px) ---
    mm.add("(min-width: 768px)", () => {
      gsap.set(teaserRef.current, { scale: 1.2, opacity: 0 });
      gsap.set(aboutRef.current, { scale: 1.2, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=3000',
        },
      });

      tl.to(heroRef.current, { scale: 0.8, opacity: 0, ease: "power2.inOut" }, 0)
        .to(teaserRef.current, { scale: 1, opacity: 1, ease: "power2.inOut" }, 0)
        .to(teaserRef.current, { scale: 0.8, opacity: 0, ease: "power2.inOut" }, 1)
        .to(aboutRef.current, { scale: 1, opacity: 1, ease: "power2.inOut" }, 1);
    });

    // --- MOBILE ANIMATION (screens 767px and narrower) ---
    mm.add("(max-width: 767px)", () => {
      const sections = [heroRef.current, teaserRef.current, aboutRef.current];
      sections.forEach(section => {
        gsap.fromTo(section, 
          { autoAlpha: 0, y: 50 }, 
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    return () => {
      mm.revert();
    }
  }, []);

  return (
    <div className="font-sans">
      <div ref={containerRef} className="relative md:h-screen">
        <div ref={heroRef} className="md:absolute md:inset-0">
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
                Step into Dimensions' 30th Pearl Jubilee at V.G. Vaze College...
              </p>
            </main>
          </div>
        </div>

        <div ref={teaserRef} className="md:absolute md:inset-0">
          <Teaser />
        </div>

      </div>

      <CSR />
      
      <SponsorSection /> {/* Added the SponsorSection here */}

      <Events></Events>


      <ContactUs></ContactUs>

      <div className="h-screen bg-black flex items-center justify-center text-center p-4">
        <h2 className="text-2xl md:text-3xl text-white">More Sections Can Go Here</h2>
      </div>
    </div>
  );
}