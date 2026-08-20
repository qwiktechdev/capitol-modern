import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { BankAccountDetails } from '../Services/interface';
import { addDoc, collection, doc, getDoc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { User } from '../Interface/MainInterface';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  log?: BankAccountDetails[];
  getUsers: () => void;
  user: User;
  isAdmin: boolean;
}

const getStatusBadge = (status: string) => {
  if (status === 'confirmed') return 'badge-success';
  if (status === 'rejected') return 'badge-danger';
  if (status === 'Pending') return 'badge-warning';
  return 'badge-neutral';
};

const TransferLogTable: React.FC<UserProps> = ({ log = [], getUsers, isAdmin, user }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<BankAccountDetails[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<BankAccountDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    setPaginatedLogs(log.slice(start, start + itemsPerPage));
  }, [currentPage, log]);

  const confirmTransaction = async (transactionId: BankAccountDetails) => {
    const transactionDocRef = doc(database, 'transfers', transactionId.id);
    await updateDoc(transactionDocRef, { status: 'confirmed', closed: true });
    await addDoc(collection(database, 'transactions'), {
      userId: user.id,
      amount: transactionId.amount,
      created: serverTimestamp(),
      type: transactionId.amount < 0 ? 'debit' : 'credit',
      custoer: transactionId.accountName,
      balance: transactionId.balance,
    });
  };

  const updateUserBalance = async (customerId: string, amount: number) => {
    setLoading(true);
    const userDocRef = doc(database, 'user', customerId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { wallet: increment(amount) });
    } else {
      throw new Error('User does not exist');
    }
    setLoading(false);
  };

  const handleConfirm = async (transaction: BankAccountDetails) => {
    try {
      await updateUserBalance(transaction.userId, transaction.amount);
      await confirmTransaction(transaction);
      getUsers();
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error confirming transaction:', error);
    }
  };

  const rejectTransaction = async (transactionId: string) => {
    const transactionDocRef = doc(database, 'transfers', transactionId);
    await updateDoc(transactionDocRef, { status: 'rejected', closed: true });
    setSelectedTransaction(null);
  };

  const handleReject = async (transaction: BankAccountDetails) => {
    setLoading(true);
    try {
      await rejectTransaction(transaction.id);
      getUsers();
    } catch (error) {
      console.error('Error rejecting transaction:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)} className="btn-secondary mb-6">
        ← Back
      </button>

      <div className="card !p-0 overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="font-semibold text-slate-900">Transfer History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Created</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Bank</th>
                <th>Type</th>
                <th>Status</th>
                {isAdmin && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr><td colSpan={isAdmin ? 8 : 7} className="py-12 text-center text-slate-400">No transfers found</td></tr>
              ) : (
                paginatedLogs.map((transaction, id) => (
                  <tr key={transaction.id}>
                    <td>{(currentPage - 1) * itemsPerPage + id + 1}</td>
                    <td>{moment(transaction.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                    <td className="font-medium">{transaction.accountName}</td>
                    <td className="font-semibold">${transaction.amount}</td>
                    <td>{transaction.bankName}</td>
                    <td className="capitalize">{transaction.transferType}</td>
                    <td><span className={getStatusBadge(transaction.status)}>{transaction.status}</span></td>
                    {isAdmin && (
                      <td className="text-center">
                        <button type="button" className="btn-primary !px-3 !py-1.5 !text-xs" onClick={() => setSelectedTransaction(transaction)}>
                          Action
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <button type="button" onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1 || loading} className="btn-secondary !py-2">Previous</button>
          <span className="text-sm text-slate-500">Page {currentPage}</span>
          <button type="button" onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage * itemsPerPage >= log.length || loading} className="btn-secondary !py-2">Next</button>
        </div>
      </div>

      {selectedTransaction && (
        <div className="modal-overlay">
          <div className="modal-panel">
            <h3 className="text-lg font-bold text-slate-900">Confirm or Reject Transfer</h3>
            <p className="mt-2 text-sm text-slate-600">
              Amount: <strong>${selectedTransaction.amount}</strong> — Customer: <strong>{selectedTransaction.accountName}</strong>
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="btn-success" disabled={loading} onClick={() => handleConfirm(selectedTransaction)}>
                {loading ? 'Please wait' : 'Confirm'}
              </button>
              <button type="button" className="btn-danger" disabled={loading} onClick={() => handleReject(selectedTransaction)}>
                {loading ? 'Please wait' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferLogTable;
