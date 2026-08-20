import React from 'react';
import { FaUser, FaHandshake, FaLifeRing } from 'react-icons/fa';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: FaUser,
    title: 'Expert Advisors',
    description: 'Dedicated professionals helping you achieve your financial goals with personalized guidance.',
  },
  {
    icon: MdOutlineAttachMoney,
    title: 'Loan Facility',
    description: 'Flexible lending options tailored to your needs, from personal loans to credit lines.',
  },
  {
    icon: FaLifeRing,
    title: 'Effective Support',
    description: 'Round-the-clock assistance whenever you need help with your account or transactions.',
  },
  {
    icon: FaHandshake,
    title: 'Personalized Service',
    description: 'Banking that puts people first — we listen, understand, and tailor solutions for you.',
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <span className="section-label">Why De Capitol</span>
          <h2 className="section-title mt-3">13k clients & growing</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            At De Capitol, we believe in banking that&apos;s not just about numbers, but about people.
            We have been dedicated to serving our community with integrity, personalized service,
            and innovative financial solutions.
          </p>
          <Link to="/Contact-us" className="btn-primary mt-8">
            Request a call
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-brand-200 hover:bg-white hover:shadow-soft"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-100 p-3 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
