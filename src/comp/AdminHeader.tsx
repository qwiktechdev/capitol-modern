import { MdEmail } from 'react-icons/md';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

function AdminHeader() {
  const handleLogout = async () => {
    await getAuth().signOut();
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/auth/dashboard">
          <img src="/image/logo.png" alt="De Capitol" className="h-12" />
        </Link>
        <div className="flex items-center gap-3">
          <button type="button" className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-brand-600">
            <MdEmail className="text-xl" />
          </button>
          <button type="button" onClick={handleLogout} className="btn-secondary !py-2">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
