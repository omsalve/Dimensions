"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealTextProps = {
  sentence?: string;
  fontSize?: string;
  lineHeight?: string;
  className?: string;
};

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  sentence = "",
  fontSize = "2rem",
  lineHeight = "3rem",
  className = ""
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sentence) return;

    const words = Array.from(containerRef.current.querySelectorAll(".word"));
    const totalWords = words.length;

    // FIX: Make the initial state more opaque/dim
    gsap.set(words, { opacity: 0.2, filter: "brightness(50%)" });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 90%",
      scrub: 2,
      onUpdate: (self: ScrollTrigger) => {
        const progress = self.progress;
        const index = Math.floor(progress * totalWords);

        words.forEach((word, i) => {
          // FIX: Updated opacity and brightness values
          const targetOpacity = i < index ? 1 : 0.2;
          const targetBrightness = i < index ? 100 : 50;

          gsap.to(word, {
            opacity: targetOpacity,
            filter: `brightness(${targetBrightness}%)`,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, [sentence]);

  if (!sentence) return null;

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        fontSize,
        lineHeight,
      }}
    >
      {sentence.split(" ").map((word, index) => (
        <span
          key={index}
          className="word"
          style={{ marginRight: "0.4em", display: "inline-block" }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export default ScrollRevealText;