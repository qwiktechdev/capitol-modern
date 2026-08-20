import { useEffect, useState } from 'react';
import { getuser } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';

export function useDashboardShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const loadUser = () => {
    getuser('', (res: User[]) => {
      if (res.length > 0) {
        setUser(res[0]);
      }
    });
  };

  useEffect(() => {
    loadUser();
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getUserInitial = () => user?.firstname?.charAt(0).toUpperCase() ?? 'U';

  return {
    isMenuOpen,
    isMobile,
    user,
    toggleMenu,
    loadUser,
    getUserInitial,
    setUser,
  };
}
