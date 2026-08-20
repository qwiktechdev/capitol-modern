import React, { useEffect } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import FundAccountq from '../comp/FundAccount';

const FundAccount: React.FC = () => {
  const shell = useDashboardShell();

  useEffect(() => {
    shell.loadUser();
  }, []);

  return (
    <DashboardLayout
      user={shell.user}
      isMenuOpen={shell.isMenuOpen}
      isMobile={shell.isMobile}
      toggleMenu={shell.toggleMenu}
      getUserInitial={shell.getUserInitial}
      title="Fund Account"
      subtitle="Add funds to your wallet"
    >
      <FundAccountq />
    </DashboardLayout>
  );
};

export default FundAccount;
