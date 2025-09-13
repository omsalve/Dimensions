import React from 'react';

const Teaser = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      {/* Fullscreen Video Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <video
          src="/videos/teaser.mp4" // IMPORTANT: Replace with your teaser video path
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      <div className="z-10">
        <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white">
          The Official Teaser
        </h2>
      </div>
    </section>
  );
};

export default Teaser;