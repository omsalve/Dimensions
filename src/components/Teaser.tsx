import React from 'react';

const Teaser = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center p-4">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        
        <video
          src="/videos/teaser.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>
      
    </section>
  );
};

export default Teaser;