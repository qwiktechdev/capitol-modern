import React from 'react';

interface Testimonial {
  name: string;
  title: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'John Stuggart',
    title: 'Business owner',
    image: '/image/c6.png',
    review:
      "I've been banking with De Capitol for over a decade, and they have consistently provided excellent service. From personal loans to investment advice, their team has always been knowledgeable and helpful.",
  },
  {
    name: 'Sarah Brown',
    title: 'Home Owner',
    image: '/image/c5.png',
    review:
      "As a first-time homebuyer, I was nervous about the mortgage process. The team at De Capitol guided me through every step, ensuring I got the best rate and terms. I couldn't be happier with their service!",
  },
];

const TestimonialItem: React.FC<Testimonial> = ({ name, title, image, review }) => (
  <div className="card !p-6">
    <div className="mb-4 flex items-center gap-4">
      <img src={image} alt={name} className="h-14 w-14 rounded-full border-2 border-brand-100 object-cover" />
      <div>
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </div>
    <p className="text-slate-600 leading-relaxed">&ldquo;{review}&rdquo;</p>
  </div>
);

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title mt-3">What our clients are saying</h2>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
            <span className="h-px w-10 bg-brand-300" />
            02 <span className="text-slate-300">|</span> 06
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.name} {...testimonial} />
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img src="/image/c7.png" alt="Why choose De Capitol" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="section-label">Our promise</span>
            <h2 className="section-title mt-3">Why choose us</h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              Customer-Centric Approach: Your needs are our priority. We listen, understand, and tailor our
              solutions to fit your unique situation. Expertise and Experience: With extensive knowledge in the
              banking industry, we help you make informed financial decisions. Innovation: We embrace technology
              to bring you convenient banking solutions. Community Involvement: We are proud to support and invest
              in the communities we serve.
            </p>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl shadow-soft">
          <img src="/image/c8.png" alt="De Capitol banking" className="h-[30vh] w-full object-cover md:h-[50vh]" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
