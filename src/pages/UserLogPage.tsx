import React, { useEffect, useState } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getuser, getusers } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import UserLog from '../comp/UserLog';

const UserLogPage: React.FC = () => {
  const shell = useDashboardShell();
  const [users, setusers] = useState<User[]>();

  const getUsers = async () => {
    await getusers('', (res: User[]) => {
      setusers(res);
    });
  };

  useEffect(() => {
    getUsers();
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
      title="User Management"
      subtitle="Manage accounts, balances, and user status"
    >
      <UserLog log={users} getUsers={getUsers} />
    </DashboardLayout>
  );
};

export default UserLogPage;
