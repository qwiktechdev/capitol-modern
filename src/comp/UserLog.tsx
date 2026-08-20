import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { User } from '../Interface/MainInterface';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Modal from './Model';
import { database } from '../firebase';

interface UserProps {
  log?: User[];
  getUsers: () => void;
}

const UserLog: React.FC<UserProps> = ({ log = [], getUsers }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<User[]>([]);
  const [isCreditDebitModalOpen, setIsCreditDebitModalOpen] = useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<number>(0);

  useEffect(() => {
    paginateLogs(currentPage);
    getUsers();
  }, [log, currentPage]);

  const paginateLogs = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    setPaginatedLogs(log.slice(startIndex, startIndex + itemsPerPage));
  };

  const handleCreditDebit = async () => {
    if (selectedUser) {
      const userDocRef = doc(database, 'user', selectedUser.id);
      const newWalletAmount = selectedUser.wallet + transactionAmount;

      await updateDoc(userDocRef, { wallet: newWalletAmount });
      await addDoc(collection(database, 'transactions'), {
        userId: selectedUser.id,
        amount: transactionAmount,
        created: serverTimestamp(),
        type: transactionAmount < 0 ? 'debit' : 'credit',
        custoer: `${selectedUser.firstname} ${selectedUser.lastname}`,
        balance: selectedUser.wallet,
      });

      setIsCreditDebitModalOpen(false);
      getUsers();
    }
  };

  const handleActivationToggle = async () => {
    if (selectedUser) {
      const userDocRef = doc(database, 'user', selectedUser.id);
      await updateDoc(userDocRef, { active: !selectedUser.active });
      setIsActiveModalOpen(false);
      getUsers();
    }
  };

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="font-semibold text-slate-900">All Users</h3>
        <p className="text-sm text-slate-500">Manage wallets and account status</p>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Created</th>
              <th>Name</th>
              <th>Account No.</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Credit/Debit</th>
              <th>Activate/Suspend</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">No users found</td>
              </tr>
            ) : (
              paginatedLogs.map((user, id) => (
                <tr key={user.id}>
                  <td>{(currentPage - 1) * itemsPerPage + id + 1}</td>
                  <td>{moment(user.created).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="font-medium">{user.firstname} {user.lastname}</td>
                  <td>{user.accountNumber}</td>
                  <td className="font-semibold">${user.wallet}</td>
                  <td>
                    <span className={user.active ? 'badge-success' : 'badge-danger'}>
                      {user.active ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => { setSelectedUser(user); setIsCreditDebitModalOpen(true); }}
                      className="btn-primary !px-3 !py-1.5 !text-xs"
                    >
                      Credit/Debit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => { setSelectedUser(user); setIsActiveModalOpen(true); }}
                      className={`${user.active ? 'btn-danger' : 'btn-success'} !px-3 !py-1.5 !text-xs`}
                    >
                      {user.active ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
        <button type="button" onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1} className="btn-secondary !py-2">Previous</button>
        <span className="text-sm text-slate-500">Page {currentPage}</span>
        <button type="button" onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage * itemsPerPage >= log.length} className="btn-secondary !py-2">Next</button>
      </div>

      {isCreditDebitModalOpen && selectedUser && (
        <Modal onClose={() => setIsCreditDebitModalOpen(false)}>
          <h2 className="text-lg font-bold text-slate-900">Credit / Debit User</h2>
          <p className="mt-2 text-sm text-slate-500">Enter a negative number to debit and a positive number to credit.</p>
          <input type="tel" placeholder="0" onChange={(e) => setTransactionAmount(Number(e.target.value))} className="input-field mt-4" />
          <button type="button" onClick={handleCreditDebit} className="btn-success mt-4 w-full">Submit</button>
        </Modal>
      )}

      {isActiveModalOpen && selectedUser && (
        <Modal onClose={() => setIsActiveModalOpen(false)}>
          <h2 className="text-lg font-bold text-slate-900">{selectedUser.active ? 'Suspend User' : 'Activate User'}</h2>
          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to {selectedUser.active ? 'suspend' : 'activate'} this user?
          </p>
          <button type="button" onClick={handleActivationToggle} className={`${selectedUser.active ? 'btn-danger' : 'btn-success'} mt-4 w-full`}>
            {selectedUser.active ? 'Suspend' : 'Activate'}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default UserLog;
