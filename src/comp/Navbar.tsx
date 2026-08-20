import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenuAltRight } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'About Us' },
  { to: '/Contact-us', label: 'Contact Us' },
];

export default function Navbar() {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const closeMobileMenu = () => setClick(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
          <img src="/image/logo.png" alt="De Capitol" className="h-12 md:h-16" />
        </Link>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setClick(!click)}
          aria-label="Toggle menu"
        >
          {click ? <AiOutlineClose size={24} /> : <BiMenuAltRight size={28} />}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive(link.to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-brand-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/login" className="btn-primary ml-2 !py-2">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      {click && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive(link.to)
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/login" onClick={closeMobileMenu} className="btn-primary w-full">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
