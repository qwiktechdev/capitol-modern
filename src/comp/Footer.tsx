import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-brand-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Stay in the loop</h2>
              <p className="mt-2 text-slate-400">Get instant news by subscribing to our daily newsletter</p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field !border-white/10 !bg-white/10 !text-white placeholder:!text-slate-400"
              />
              <button type="button" className="btn-accent flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src="/image/logo.png" alt="De Capitol" className="mb-6 h-14 brightness-0 invert" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Contact</p>
              <p>1408 Mollys Pl, Alabaster, AL 35007</p>
              <p className="pt-2">
                <a href="tel:+12055492340" className="transition hover:text-accent-400">
                  +1 (205) 549-2340
                </a>
              </p>
              <p>contact@decapitol.online</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="transition hover:text-accent-400">Home</Link></li>
              <li><Link to="/who-we-are" className="transition hover:text-accent-400">Who We Are</Link></li>
              <li><Link to="/Contact-us" className="transition hover:text-accent-400">Contact Us</Link></li>
              <li><Link to="/login" className="transition hover:text-accent-400">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Legal & Social</h3>
            <ul className="mb-6 space-y-3 text-sm">
              <li><a href="#" className="transition hover:text-accent-400">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-accent-400">Terms & Conditions</a></li>
              <li><a href="#" className="transition hover:text-accent-400">FAQ</a></li>
            </ul>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm transition hover:bg-brand-600 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2008 De Capitol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
