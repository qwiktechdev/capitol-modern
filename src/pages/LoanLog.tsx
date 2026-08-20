import React, { useEffect, useState } from 'react';
import DashboardLayout from '../comp/DashboardLayout';
import { useDashboardShell } from '../comp/useDashboardShell';
import { getuser, LoanRequest } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import { UserLoanDetails } from '../Services/interface';
import LoanRequestLog from '../comp/LoanRequestLog';

const LoanLog: React.FC = () => {
  const shell = useDashboardShell();
  const [loans, setLoans] = useState<UserLoanDetails[]>();

  const getUsers = async (userRole: 'user' | 'admin' | 'moderator' | undefined, userID: string) => {
    LoanRequest('', (res: UserLoanDetails[]) => {
      let data = res;
      if (userRole !== 'admin') {
        data = res.filter((e) => e.email === userID);
      }
      setLoans(data);
    });
  };

  const getU = async () => {
    getuser('', async (res: User[]) => {
      const data = res[0];
      await getUsers(data?.permission, data.email);
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
      title="Loan History"
      subtitle="Review and manage loan applications"
    >
      <LoanRequestLog
        user={shell.user as User}
        log={loans}
        getUsers={getU}
        isAdmin={shell.user?.permission === 'admin'}
      />
    </DashboardLayout>
  );
};

export default LoanLog;
