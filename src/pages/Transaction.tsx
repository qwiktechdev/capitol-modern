import React, { useEffect, useState } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getTransaction, getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import TransactionLog from '../comp/TransactionLog';
import { Transaction } from '../Services/interface';

const TransactionPage: React.FC = () => {
  const shell = useDashboardShell();
  const [transaction, setTransaction] = useState<Transaction[]>();

  const getUsers = async (userRole: 'user' | 'admin' | 'moderator' | undefined, userID: string) => {
    getTransaction('', (res: Transaction[]) => {
      let data = res;
      if (userRole !== 'admin') {
        data = res.filter((e) => e.userId === userID);
      }
      setTransaction(data);
    });
  };

  const getU = async () => {
    getuser('', async (res: User[]) => {
      const data = res[0];
      if (data) {
        await getUsers(data?.permission, data.id);
        shell.setUser(data);
      }
    });
  };

  useEffect(() => {
    getU();
  }, []);

  return (
    <DashboardLayout
      user={shell.user}
      isMenuOpen={shell.isMenuOpen}
      isMobile={shell.isMobile}
      toggleMenu={shell.toggleMenu}
      getUserInitial={shell.getUserInitial}
      title="Transactions"
      subtitle="View your complete transaction history"
    >
      <TransactionLog log={transaction as Transaction[]} getUsers={getU} />
    </DashboardLayout>
  );
};

export default TransactionPage;
