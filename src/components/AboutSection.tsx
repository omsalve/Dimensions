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

  // 3D Sphere Animation (remains the same)
  useEffect(() => {
    // ... (3D sphere code is unchanged)
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff99ff, wireframe: true });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 3;

    const handleResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP Scroll Animations for stats
  useEffect(() => {
    // REMOVED the overall section fade-in animation
    
    // Animate the stats numbers
    const stats = statsRef.current.filter(el => el !== null) as HTMLSpanElement[];
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      gsap.fromTo(stat, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power3.inOut',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

  }, []);

  return (
    // REMOVED opacity-0 class from section
    <section ref={sectionRef} className="h-screen flex items-center justify-center py-20 px-8">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="text-content">
          <h2 className="text-4xl font-bold mb-6 tracking-tighter">
            30 Years of Defying Dimensions
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            This isn't just a festival; it's a legacy. For three decades, Dimensions has been the ultimate stage for talent, creativity, and innovation. As we celebrate our Pearl Jubilee, we're pushing the boundaries further than ever before. This is a two-day extravaganza where imagination comes to life.
          </p>
          <div className="stats-grid grid grid-cols-2 gap-8 text-center">
            <div className="stat-item">
              <span ref={el => { statsRef.current[0] = el; }} data-target="30" className="text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-slate-400">Years of Legacy</p>
            </div>
            <div className="stat-item">
              <span ref={el => { statsRef.current[1] = el; }} data-target="120" className="text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-slate-400">Colleges Participating</p>
            </div>
            <div className="stat-item">
              <span ref={el => { statsRef.current[2] = el; }} data-target="20000" className="text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-slate-400">Attendees</p>
            </div>
            <div className="stat-item">
              <span ref={el => { statsRef.current[3] = el; }} data-target="600" className="text-5xl font-bold text-[#FF9FFC]">0</span>
              <p className="text-slate-400">Passionate Team Members</p>
            </div>
          </div>
        </div>
        <div className="visual-content h-96 w-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;