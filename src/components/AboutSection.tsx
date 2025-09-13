"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    // ... (3D sphere code is unchanged)
  }, []);

  useEffect(() => {
    const stats = statsRef.current.filter(el => el !== null) as HTMLSpanElement[];
    // ... (GSAP stats animation is unchanged)
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-8">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="text-content text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tighter">
            30 Years of Defying Dimensions
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            This isn't just a festival; it's a legacy...
          </p>
          <div className="stats-grid grid grid-cols-2 gap-4 sm:gap-8 text-center">
            <div className="stat-item">
              <span ref={el => { statsRef.current[0] = el; }} data-target="30" className="text-4xl sm:text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-sm sm:text-base text-slate-400">Years of Legacy</p>
            </div>
            <div className="stat-item">
               <span ref={el => { statsRef.current[1] = el; }} data-target="120" className="text-4xl sm:text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-sm sm:text-base text-slate-400">Colleges</p>
            </div>
            <div className="stat-item">
               <span ref={el => { statsRef.current[2] = el; }} data-target="20000" className="text-4xl sm:text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-sm sm:text-base text-slate-400">Attendees</p>
            </div>
            <div className="stat-item">
              <span ref={el => { statsRef.current[3] = el; }} data-target="600" className="text-4xl sm:text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-sm sm:text-base text-slate-400">Team Members</p>
            </div>
          </div>
        </div>
        <div className="visual-content h-64 md:h-96 w-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;