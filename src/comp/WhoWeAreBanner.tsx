import React from 'react';

const WhoWeAreBanner: React.FC = () => {
  return (
    <section
      className="relative flex min-h-[50vh] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image/c9.png')" }}
    >
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 px-4 text-center">
        <span className="section-label mb-4 inline-block text-brand-300">About De Capitol</span>
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">Banking Without Borders</h1>
        <p className="mt-4 text-lg text-slate-200">Move money fast and securely</p>
      </div>
    </section>
  );
};

export default WhoWeAreBanner;
