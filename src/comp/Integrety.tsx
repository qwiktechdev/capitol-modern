import React from 'react';

const values = [
  { label: 'Integrity', color: 'from-accent-500 to-accent-600' },
  { label: 'Customer Focus', color: 'from-brand-600 to-brand-700' },
  { label: 'Innovation', color: 'from-indigo-600 to-brand-800' },
];

function Integrety() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="text-center">
          <span className="section-label">Our story</span>
          <h2 className="section-title mt-3">Who We Are</h2>
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-600">
          <p>
            At De Capitol Bank, we redefine the financial experience with a commitment to excellence,
            innovation, and personalized service. Established with the vision of creating a bank that
            truly understands and meets the diverse needs of our clients, we are dedicated to fostering
            financial growth and stability through a comprehensive suite of services.
          </p>
          <p>
            Our mission is to revolutionize banking by focusing on what matters most: our clients.
            Our founders envisioned a financial institution that blends traditional values with modern
            technology, offering a unique blend of reliability and cutting-edge solutions.
          </p>
          <p>
            At De Capitol Bank, we believe in a client-centric approach that places your needs at the
            heart of everything we do.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.label}
              className={`rounded-2xl bg-gradient-to-br ${value.color} p-6 text-center font-bold text-white shadow-soft`}
            >
              {value.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Integrety;
