import React, { useEffect } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import SupportLog from '../comp/SupportLog';

const Support: React.FC = () => {
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
      title="Support"
      subtitle="Get help or submit a support request"
    >
      <SupportLog user={shell.user!} />
    </DashboardLayout>
  );
};

export default Support;
