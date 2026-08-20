import React from 'react';
import {
  FaTimes,
  FaHome,
  FaUsers,
  FaExchangeAlt,
  FaWallet,
  FaHandHoldingUsd,
  FaCog,
  FaHeadset,
  FaSignOutAlt,
  FaHistory,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { User } from '../Interface/MainInterface';

interface SideMenuProps {
  user: User;
  toggleMenu: () => void;
  isMobile: boolean;
}

const menuItems = [
  { to: '/auth/dashboard', label: 'Dashboard', icon: FaHome },
  { to: '/auth/User/dashboard', label: 'Users', icon: FaUsers, adminOnly: true },
  { to: '/auth/transaction/dashboard', label: 'Transactions', icon: FaHistory },
  { to: '/auth/transfer/dashboard', label: 'Transfer', icon: FaExchangeAlt },
  { to: '/auth/fund-account/dashboard', label: 'Fund Account', icon: FaWallet },
  { to: '/auth/loan/dashboard', label: 'Loan Request', icon: FaHandHoldingUsd },
  { to: '/auth/account-setting/dashboard', label: 'Settings', icon: FaCog },
  { to: '/auth/account-support/dashboard', label: 'Support', icon: FaHeadset },
];

const SideMenu: React.FC<SideMenuProps> = ({ user, toggleMenu, isMobile }) => {
  const location = useLocation();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside
      className={`${
        isMobile ? 'absolute' : 'fixed'
      } left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-brand-950 text-white shadow-card`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-300">Welcome back</p>
          <h2 className="mt-0.5 truncate text-lg font-bold">
            {user?.firstname} {user?.lastname}
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleMenu}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            if (item.adminOnly && user?.permission !== 'admin') return null;
            const Icon = item.icon;
            const active = location.pathname === item.to;

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-brand-600 text-white shadow-glow'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="text-base opacity-80" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
