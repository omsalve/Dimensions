"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrollRevealText from "./ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

const csrImages = [
  { src: "/images/csr/IMG_0289.jpg", alt: "Community volunteers planting trees." },
  { src: "/images/csr/IMG_0295.jpg", alt: "A group cleaning up a local beach." },
  { src: "/images/csr/IMG_0328.jpg", alt: "Organizing a successful donation camp." },
  { src: "/images/csr/IMG_0582.jpg", alt: "Students interacting with animals at a shelter." },
  { src: "/images/csr/IMG_0768.jpg", alt: "Participants in a charity run event." },
  { src: "/images/csr/IMG_1460.jpg", alt: "An awareness campaign in action." },
];

const paragraphText =
  "In 2024, Dimensions carried out impactful Community Engagement Activities (CEAs) under कर्मयोग (Karmayog), reflecting a strong commitment to social responsibility and compassion. Through करुणा, students promoted menstrual health and hygiene by distributing sanitary pads and stationery to underprivileged girls. कल्याण involved collecting and donating food grains to families in need, while कर्तव्य brought joy to children through skits and nutritious meals. These initiatives showcased Dimensions’ dedication to community welfare and inspired students to be empathetic, responsible changemakers.";

const CSR = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(".masonry-item");

    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          autoAlpha: 0,
          y: 60,
          scale: 0.95,
          rotationZ: -2,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotationZ: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-8 bg-black relative z-0;">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Column — Sticky Text */}
          <div className="sticky top-24 self-start">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-white">
              Beyond the Fest: Our Social Responsibility
            </h2>
            <ScrollRevealText
              sentence={paragraphText}
              className="text-2xl leading-relaxed text-slate-200"
            />
          </div>

          {/* Right Column — Masonry Grid */}
          <div ref={gridRef} className="masonry-grid">
            {csrImages.map((image, i) => (
              <div
                key={i}
                className="masonry-item mb-4 break-inside-avoid opacity-0"
              >
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
          </div>
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
