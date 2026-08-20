import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { UserLoanDetails } from '../Services/interface';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { User } from '../Interface/MainInterface';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  log?: UserLoanDetails[];
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

const LoanRequestLog: React.FC<UserProps> = ({ log = [], getUsers, isAdmin }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<UserLoanDetails[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<UserLoanDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    setPaginatedLogs(log.slice(start, start + itemsPerPage));
  }, [currentPage, log]);

  const confirmTransaction = async (transactionId: UserLoanDetails) => {
    const transactionDocRef = doc(database, 'loanRequests', transactionId.id);
    await updateDoc(transactionDocRef, { status: 'confirmed', closed: true });
  };

  const handleConfirm = async (transaction: UserLoanDetails) => {
    try {
      await confirmTransaction(transaction);
      getUsers();
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error confirming transaction:', error);
    }
  };

  const rejectTransaction = async (transactionId: string) => {
    const transactionDocRef = doc(database, 'loanRequests', transactionId);
    await updateDoc(transactionDocRef, { status: 'rejected', closed: true });
    setSelectedTransaction(null);
  };

  const handleReject = async (transaction: UserLoanDetails) => {
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
          <h3 className="font-semibold text-slate-900">Loan History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Created</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Phone</th>
                <th>Status</th>
                {isAdmin && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr><td colSpan={isAdmin ? 7 : 6} className="py-12 text-center text-slate-400">No loan requests found</td></tr>
              ) : (
                paginatedLogs.map((transaction, id) => (
                  <tr key={transaction.id}>
                    <td>{(currentPage - 1) * itemsPerPage + id + 1}</td>
                    <td>{moment(transaction.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                    <td className="font-medium">{transaction.fullName}</td>
                    <td className="font-semibold">${transaction.loanAmount}</td>
                    <td>{transaction.phone}</td>
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

      {selectedTransaction && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-panel">
            <h3 className="text-lg font-bold text-slate-900">Confirm or Reject Loan</h3>
            <p className="mt-2 text-sm text-slate-600">
              Amount: <strong>${selectedTransaction.loanAmount}</strong> — Applicant: <strong>{selectedTransaction.fullName}</strong>
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

export default LoanRequestLog;
