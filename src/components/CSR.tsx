"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

// --- Component Content ---
const csrImages = [
    { src: 'https://picsum.photos/seed/csr1/600/800', alt: 'Community volunteers planting trees.' },
    { src: 'https://picsum.photos/seed/csr2/600/600', alt: 'A group cleaning up a local beach.' },
    { src: 'https://picsum.photos/seed/csr3/600/900', alt: 'Organizing a successful donation camp.' },
    { src: 'https://picsum.photos/seed/csr4/600/700', alt: 'Students interacting with animals at a shelter.' },
    { src: 'https://picsum.photos/seed/csr5/600/500', alt: 'Participants in a charity run event.' },
    { src: 'https://picsum.photos/seed/csr6/600/800', alt: 'An awareness campaign in action.' },
];

const paragraphText = "In 2024, Dimensions carried out impactful Community Engagement Activities (CEAs) under कर्मयोग (Karmayog), reflecting a strong commitment to social responsibility and compassion. Through करुणा, students promoted menstrual health and hygiene by distributing sanitary pads and stationery to underprivileged girls. कल्याण involved collecting and donating food grains to families in need, while कर्तव्य brought joy to children through skits and nutritious meals. These initiatives showcased Dimensions’ dedication to community welfare and inspired students to be empathetic, responsible changemakers.";

// --- Main CSR Component ---
const CSR = () => {
    const masonryGridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gridItems = gsap.utils.toArray('.masonry-item');

        if (gridItems.length > 0) {
            gsap.fromTo(gridItems, 
                { 
                    autoAlpha: 0,    // Start invisible
                    y: 60,           // Start slightly lower
                    scale: 0.95,     // Start slightly smaller
                    rotationZ: -2    // Start slightly tilted for a dynamic effect
                },
                {
                    autoAlpha: 1,    // Fade in
                    y: 0,
                    scale: 1,
                    rotationZ: 0,
                    stagger: 0.1,    // Staggered animation for each item
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: masonryGridRef.current,
                        start: 'top 85%', // Start animation when the grid is 85% from the top
                        toggleActions: 'play none none none',
                    }
                }
            );
        }
    }, []);

  return (
    <section className="py-24 px-4 sm:px-8 bg-black overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Sticky Text Content */}
          <div className="sticky top-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-white">
              Beyond the Fest: Our Social Responsibility
            </h2>
            <ScrollRevealText
              sentence={paragraphText}
              className="text-2xl leading-relaxed"
            />
          </div>

          {/* Right Column: Animated Masonry Grid */}
          <div ref={masonryGridRef} className="masonry-grid">
            {csrImages.map((image, index) => (
              <div key={index} className="masonry-item mb-4 break-inside-avoid invisible">
                <div className="overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={800}
                      className="rounded-lg w-full h-auto transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                </div>
              </div>
            ))}
          </div >
        </div>
      </div>
      <style jsx global>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 1rem;
        }
        @media (max-width: 767px) {
            .masonry-grid {
                column-count: 1;
            }
        }
        .break-inside-avoid {
          break-inside: avoid;
        }
      `}</style>
    </section>
  );
};

export default CSR;