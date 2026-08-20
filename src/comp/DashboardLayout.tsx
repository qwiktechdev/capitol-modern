import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import SideMenu from './SideMenu';
import { User } from '../Interface/MainInterface';

interface DashboardLayoutProps {
  user?: User;
  isMenuOpen: boolean;
  isMobile: boolean;
  toggleMenu: () => void;
  getUserInitial: () => string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  isMenuOpen,
  isMobile,
  toggleMenu,
  getUserInitial,
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {isMenuOpen && user && (
        <SideMenu user={user} toggleMenu={toggleMenu} isMobile={isMobile} />
      )}

      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
          isMenuOpen && !isMobile ? 'lg:ml-72' : 'ml-0'
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-4">
              {!isMenuOpen && (
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100"
                  aria-label="Open menu"
                >
                  <FaBars className="text-lg" />
                </button>
              )}
              <img src="/image/logo.png" alt="De Capitol" className="h-12 md:h-14" />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-brand-600"
                aria-label="Notifications"
              >
                <FaBell />
              </button>
              {user?.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-brand-100 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-sm font-bold text-white">
                  {getUserInitial()}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {(title || subtitle) && (
            <div className="page-header animate-fade-in">
              {title && <h1 className="page-title">{title}</h1>}
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
