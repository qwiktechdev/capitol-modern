import React from 'react';

interface Service {
  title: string;
  image: string;
  accent?: boolean;
}

const services: Service[] = [
  { title: 'International Transfer', image: '/image/c1.png', accent: true },
  { title: 'Local Transfer', image: '/image/c3.png' },
  { title: 'Loans and Credit Line', image: '/image/c2.png' },
  { title: 'Investment Banking', image: '/image/c4.png', accent: true },
];

const OurService: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="section-label">What we offer</span>
          <h2 className="section-title mt-3">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600">Move money fast and securely with our comprehensive banking solutions</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent" />
              </div>
              <div className={`p-5 ${service.accent ? 'bg-brand-900 text-white' : 'bg-white'}`}>
                <h3 className="text-center font-semibold">{service.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurService;
