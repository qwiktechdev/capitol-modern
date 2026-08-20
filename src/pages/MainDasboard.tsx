import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaExchangeAlt, FaHandHoldingUsd, FaIdCard } from 'react-icons/fa';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getTransaction, gettransger, getuser, LoanRequest } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import { formatNumber } from '../Services/Utility';
import TransactionLog from '../comp/TransactionLog';
import { Transaction } from '../Services/interface';

const statCards = [
  { key: 'wallet', label: 'Account Balance', icon: FaWallet, gradient: 'from-brand-600 to-brand-800', link: '/auth/fund-account/dashboard', cta: 'Fund Account' },
  { key: 'transfer', label: 'Total Transfer', icon: FaExchangeAlt, gradient: 'from-indigo-600 to-brand-900', link: '/auth/transfer/dashboard', cta: 'Transfer fund' },
  { key: 'loan', label: 'Total Loan', icon: FaHandHoldingUsd, gradient: 'from-violet-600 to-indigo-800', link: '/auth/loan/dashboard', cta: 'New Request' },
  { key: 'account', label: 'Account Information', icon: FaIdCard, gradient: 'from-slate-700 to-brand-950', link: null, cta: null },
];

const Dashboard: React.FC = () => {
  const shell = useDashboardShell();
  const [transaction, setTransaction] = useState<Transaction[]>();
  const [totalAmount, setTotalTransfer] = useState(0);
  const [totalLoad, setTotalTransferLoan] = useState(0);

  const getUsers = async (userRole: 'user' | 'admin' | 'moderator' | undefined, userID: string, email: string) => {
    gettransger('', (res: any[]) => {
      let data = userRole !== 'admin' ? res.filter((item) => item.userId === userID) : res;
      const total = data.reduce((sum, item) => sum + item.amount, 0);
      setTotalTransfer((prev) => (prev !== total ? total : prev));
    });

    LoanRequest('', (res: any[]) => {
      let data = userRole !== 'admin' ? res.filter((item) => item.email === userID) : res;
      const total = data.reduce((sum, item) => sum + item.loanAmount, 0);
      setTotalTransferLoan((prev) => (prev !== total ? total : prev));
    });

    getTransaction('', (res: Transaction[]) => {
      let data = userRole !== 'admin' ? res.filter((e) => e.userId === userID) : res;
      if (JSON.stringify(transaction) !== JSON.stringify(data)) {
        setTransaction(data);
      }
    });
  };

  const getU = async () => {
    getuser('', async (res: User[]) => {
      if (res.length > 0) {
        const data = res[0];
        if (!shell.user) {
          await getUsers(data?.permission, data.id, data.email);
          shell.setUser(data);
        }
      }
    });
  };

  useEffect(() => {
    getU();
  }, []);

  const getStatValue = (key: string) => {
    if (key === 'wallet') return shell.user?.wallet ? '$' + formatNumber(shell.user.wallet) : '$0';
    if (key === 'transfer') return totalAmount ? '$' + formatNumber(totalAmount) : '$0';
    if (key === 'loan') return totalLoad ? '$' + formatNumber(totalLoad) : '$0';
    if (key === 'account') return shell.user?.accountNumber ?? '—';
    return '—';
  };

  const getStatCta = (key: string) => {
    if (key === 'account') return shell.user?.active ? 'Active' : 'No Debit';
    return null;
  };

  return (
    <DashboardLayout
      user={shell.user}
      isMenuOpen={shell.isMenuOpen}
      isMobile={shell.isMobile}
      toggleMenu={shell.toggleMenu}
      getUserInitial={shell.getUserInitial}
      title={`Welcome, ${shell.user?.firstname ?? 'User'}!`}
      subtitle="Here's an overview of your account activity"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={`card-stat bg-gradient-to-br ${card.gradient}`}>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-white/15 p-2.5">
                  <Icon className="text-lg" />
                </div>
                <p className="text-sm font-medium text-white/80">{card.label}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">{getStatValue(card.key)}</h3>
                {card.link ? (
                  <Link to={card.link} className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-white/90">
                    {card.cta}
                  </Link>
                ) : (
                  <span className="mt-4 inline-flex rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                    {getStatCta(card.key)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <TransactionLog log={transaction as Transaction[]} getUsers={getU} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
