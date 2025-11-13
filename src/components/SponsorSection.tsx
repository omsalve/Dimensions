import React from 'react';
import TiltedCard from './TiltedCard';

const sponsorLogos = [
  { src: '/images/logos/coke.png', alt: 'Coca-Cola' },
  { src: '/images/logos/hp.png', alt: 'HP' },
  { src: '/images/logos/mhtimes.png', alt: 'Maharashtra Times' },
  { src: '/images/logos/plum.png', alt: 'Plum' },
  { src: '/images/logos/sony.png', alt: 'Sony' },
  { src: '/images/logos/sugar.png', alt: 'Sugar Cosmetics' },
  { src: '/images/logos/tiptop.png', alt: 'Tip Top Plaza' },
  { src: '/images/logos/zmarathi.png', alt: 'Zee Marathi' },
  { src: '/images/logos/zyuva.png', alt: 'Zee Yuva' },
];

const SponsorSection = () => {
  return (
    <section className="py-24 bg-black text-white relative z-0">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
          Our Valued Sponsors
        </h2>
        <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">
          We are incredibly grateful for the support of our sponsors who make Dimensions possible.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {sponsorLogos.map((sponsor, index) => (
            <TiltedCard 
              key={index}
              imageSrc={sponsor.src}
              altText={sponsor.alt}
              captionText={sponsor.alt}
              // FIX: Adjusted sizing and added background color
              containerHeight="160px"
              imageHeight="100%"
              imageWidth="100%"
              bgColor="#f5f5f5" // Off-white background
              scaleOnHover={1.05}
              rotateAmplitude={10}
              showMobileWarning={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;