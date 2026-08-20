import React, { useEffect, useState } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getTransaction, getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import { Transaction } from '../Services/interface';
import TransferForm from '../comp/TransferDoc';

const Transfer: React.FC = () => {
  const shell = useDashboardShell();
  const [, setTransaction] = useState<any>();

  const getUsers = async (userRole: 'user' | 'admin' | 'moderator' | undefined, userID: string) => {
    getTransaction('', (res: Transaction[]) => {
      let data = res;
      if (userRole !== 'admin') {
        data = res.filter((e: any) => e.userId === userID);
      }
      setTransaction(data);
    });
  };

  const getU = async () => {
    getuser('', async (res: User[]) => {
      const data = res[0];
      await getUsers(data?.permission, data.id);
      shell.setUser(data);
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
      title="Transfer Funds"
      subtitle="Send money locally or internationally"
    >
      <TransferForm user={shell.user as User} />
    </DashboardLayout>
  );
};

export default Transfer;
