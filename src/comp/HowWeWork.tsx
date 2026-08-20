import React from 'react';
import { FaWrench, FaRegLightbulb, FaUserTie } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';

const steps = [
  { icon: FaRegLightbulb, title: 'Understanding Your Needs', description: 'We start by listening to you and understanding your financial goals, challenges, and aspirations.' },
  { icon: MdSupportAgent, title: 'Customized Solutions', description: 'Based on our understanding, we design and offer customized financial solutions that align with your objectives.' },
  { icon: FaUserTie, title: 'Expert Guidance', description: 'Our team of financial experts brings a wealth of knowledge and experience to help you make informed decisions.' },
  { icon: FaWrench, title: 'Ongoing Support', description: 'We remain by your side throughout your financial journey with continuous support and guidance.' },
];

const HowWeWork: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="section-label">Our process</span>
          <h2 className="section-title mt-3">How we work</h2>
          <p className="mt-4 text-slate-600">
            At De Capitol Bank, we believe in a client-centric approach that places your needs at the heart of everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img src="/image/c10.png" alt="Client meeting" className="w-full object-cover" />
            </div>
            <div className="rounded-2xl bg-brand-950 p-8 text-slate-200">
              <p className="text-sm leading-relaxed">
                De Capitol Bank is dedicated to being more than just a financial institution. We are your partner
                in achieving financial success and stability. Thank you for choosing De Capitol Bank.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card flex gap-4 !p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <Icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
