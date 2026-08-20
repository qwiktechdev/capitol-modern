import React, { useEffect } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import AccountSettings from './AccountSettings';

const AccountSettingsPage: React.FC = () => {
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
      title="Account Settings"
      subtitle="Manage your profile and security preferences"
    >
      <AccountSettings />
    </DashboardLayout>
  );
};

export default AccountSettingsPage;
