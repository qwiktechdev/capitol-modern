import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = ['/image/n.jpg', '/image/n1.jpg', '/image/n2.jpg'];

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}

      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 md:px-8">
        <div className="max-w-2xl animate-slide-up">
          <span className="section-label mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur-sm">
            Trusted by 13,000+ clients worldwide
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Banking Without{' '}
            <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
              Borders
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-200 md:text-xl">
            Move money fast and securely with personalized service, expert advisors, and innovative financial solutions.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register" className="btn-accent !px-8 !py-3">
              Open an Account
            </Link>
            <Link to="/Contact-us" className="btn-secondary !border-white/20 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white/20">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-accent-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
