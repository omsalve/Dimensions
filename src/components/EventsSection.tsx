"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data for our event "slides"
// Using data from your Header.tsx
const eventData = [
  {
    title: 'Competitions',
    description: 'Showcase your skills and compete against the best. From coding to dance, there\'s a stage for everyone.',
    href: '/events/competitions',
    image: 'https://picsum.photos/seed/competitions/1920/1080',
  },
  {
    title: 'Workshops',
    description: 'Learn from industry experts. Get hands-on experience with new technologies, art forms, and ideas.',
    href: '/events/workshops',
    image: 'https://picsum.photos/seed/workshops/1920/1080',
  },
  {
    title: 'Shows',
    description: 'Experience unforgettable performances. Our stages come alive with music, comedy, and spectacular talent.',
    href: '/events/shows',
    image: 'https://picsum.photos/seed/shows/1920/1080',
  },
];

const EventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinner = pinnerRef.current;
    const slides = slidesRef.current;
    if (!section || !pinner || !slides.length) return;

    // Set initial state
    gsap.set(slides, { autoAlpha: 0, scale: 1.05 });
    gsap.set(slides[0], { autoAlpha: 1, scale: 1 });
    gsap.set(slides.map(s => s.querySelector('.event-content')), { y: 30, opacity: 0 });
    gsap.set(slides[0].querySelector('.event-content'), { y: 0, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: pinner,
        scrub: 1,
        start: 'top top',
        end: `+=${slides.length * 1000}`, // 1000px of scroll per transition
      },
    });

    // Loop through slides to create transitions
    slides.forEach((slide, index) => {
      if (index === 0) return; // Skip the first slide (it's already visible)

      const prevSlide = slides[index - 1];
      const prevContent = prevSlide.querySelector('.event-content');
      const currentContent = slide.querySelector('.event-content');

      // Add a "pause" at the start of each transition
      tl.add("pause", `+=${index * 1.5}`);

      // Animate out the previous slide
      tl.to(prevContent, {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      }, "pause");
      tl.to(prevSlide, {
        autoAlpha: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      }, "<"); // "<" means start at the same time as the previous animation

      // Animate in the current slide
      tl.to(slide, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, "pause");
      tl.to(currentContent, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, "pause+=0.3"); // Start 0.3s after the slide starts fading in
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div ref={pinnerRef} className="relative h-screen w-full overflow-hidden">
        {eventData.map((event, index) => (
          <div
            key={event.title}
            ref={el => { if (el) slidesRef.current[index] = el; }}
            className="event-slide absolute inset-0 w-full h-full flex items-center justify-center text-center text-white"
            style={{ willChange: 'opacity, transform' }} // Optimize for animation
          >
            {/* Background Image */}
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Text Content */}
            <div className="event-content relative z-20 flex flex-col items-center gap-6 p-4">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                {event.title}
              </h2>
              <p className="max-w-xl text-lg md:text-xl text-slate-200">
                {event.description}
              </p>
              <Link
                href={event.href}
                className="bg-white text-black font-bold py-3 px-8 rounded-md text-lg transition-transform hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;