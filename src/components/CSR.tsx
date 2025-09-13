"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ScrollRevealText from './ScrollRevealText'; // Import our new component

gsap.registerPlugin(ScrollTrigger);

const csrImages = [
    { src: 'https://picsum.photos/seed/csr1/600/800', alt: 'Placeholder image for a social initiative' },
    { src: 'https://picsum.photos/seed/csr2/600/600', alt: 'Placeholder image for a social initiative' },
    { src: 'https://picsum.photos/seed/csr3/600/900', alt: 'Placeholder image for a social initiative' },
    { src: 'https://picsum.photos/seed/csr4/600/700', alt: 'Placeholder image for a social initiative' },
    { src: 'https://picsum.photos/seed/csr5/600/500', alt: 'Placeholder image for a social initiative' },
    { src: 'https://picsum.photos/seed/csr6/600/800', alt: 'Placeholder image for a social initiative' },
];

const paragraphText = "Dimensions is more than a celebration; it's a platform for positive change. We believe in empowering our community and nurturing our environment. Through initiatives like tree plantation drives, beach cleanups, and donation camps, we strive to create a lasting impact that resonates long after the curtains fall.";

const CSR = () => {
    const masonryGridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gridItems = gsap.utils.toArray('.masonry-item');

        if (gridItems.length > 0) {
            gsap.fromTo(gridItems, 
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: masonryGridRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }
    }, []);

  return (
    <section className="py-24 px-4 sm:px-8 bg-black overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          <div className="sticky top-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
              Beyond the Fest: Our Social Responsibility
            </h2>
            <ScrollRevealText
              text={paragraphText}
              className="text-lg leading-relaxed"
            />
          </div>

          <div ref={masonryGridRef} className="masonry-grid">
            {csrImages.map((image, index) => (
              <div key={index} className="masonry-item mb-4 break-inside-avoid invisible">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={800}
                  className="rounded-lg w-full h-auto"
                />
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