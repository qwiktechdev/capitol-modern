import React, { useEffect } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import TransferForm from '../comp/TransferDoc';

const TransferLogPage: React.FC = () => {
  const shell = useDashboardShell();

  useEffect(() => {
    getuser('', (res: User[]) => {
      if (res[0]) shell.setUser(res[0]);
    });
  }, []);

  return (
    <DashboardLayout
      user={shell.user}
      isMenuOpen={shell.isMenuOpen}
      isMobile={shell.isMobile}
      toggleMenu={shell.toggleMenu}
      getUserInitial={shell.getUserInitial}
      title="Transfer"
      subtitle="Initiate a new transfer"
    >
      <TransferForm user={shell.user as User} />
    </DashboardLayout>
  );
};

export default TransferLogPage;
