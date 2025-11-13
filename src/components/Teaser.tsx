import React from 'react';

// TODO: Upload video to CDN and replace this URL
// Recommended services: Cloudinary, Bunny CDN, or AWS S3
const VIDEO_URL = process.env.NEXT_PUBLIC_TEASER_VIDEO_URL || "/videos/aftermovieteaserdimensions.mp4";

const Teaser = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center p-4">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        
        <video
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Teaser video failed to load:', e);
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      </div>
      
    </section>
  );
};

export default Teaser;