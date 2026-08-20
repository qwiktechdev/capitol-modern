import React, { useEffect } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import LoanRequestForm from '../comp/LoadForm';

const LoanPage: React.FC = () => {
  const shell = useDashboardShell();

  const getU = async () => {
    getuser('', async (res: User[]) => {
      const data = res[0];
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
      title="Loan Request"
      subtitle="Apply for a personal or business loan"
    >
      <LoanRequestForm user={shell.user as User} />
    </DashboardLayout>
  );
};

export default LoanPage;
