import React from 'react';
import { Link } from 'react-router-dom';

const ContactUsBanner: React.FC = () => {
  return (
    <section
      className="relative flex min-h-[40vh] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image/c11.png')" }}
    >
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">Contact Us</h1>
        <p className="mt-4 text-slate-200">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-accent-400">Contact Us</span>
        </p>
      </div>
    </section>
  );
};

export default ContactUsBanner;
