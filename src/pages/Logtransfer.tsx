import React, { useEffect, useState } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { gettransger, getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import { BankAccountDetails } from '../Services/interface';
import TransferLogTable from '../comp/TransferLogTable';

const Logtransfer: React.FC = () => {
  const shell = useDashboardShell();
  const [transaction, setTransaction] = useState<BankAccountDetails[]>();

  const getUsers = async (userRole: 'user' | 'admin' | 'moderator' | undefined, userID: string) => {
    gettransger('', (res: BankAccountDetails[]) => {
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
      title="Transfer History"
      subtitle="Review and manage transfer requests"
    >
      <TransferLogTable
        user={shell.user as User}
        log={transaction}
        getUsers={getU}
        isAdmin={shell.user?.permission === 'admin'}
      />
    </DashboardLayout>
  );
};

export default Logtransfer;
