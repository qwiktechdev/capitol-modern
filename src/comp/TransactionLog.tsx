import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Transaction } from '../Services/interface';

interface UserProps {
  log?: Transaction[];
  getUsers: () => void;
}

const TransactionLog: React.FC<UserProps> = ({ log = [], getUsers }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<Transaction[]>([]);

  useEffect(() => {
    paginateLogs(currentPage);
  }, [currentPage, log]);

  useEffect(() => {
    getUsers();
  }, []);

  const paginateLogs = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedLogs(log.slice(startIndex, endIndex));
  };

  const getTypeBadge = (type: string) => {
    if (type === 'credit') return 'badge-success';
    if (type === 'debit') return 'badge-danger';
    return 'badge-neutral';
  };

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="font-semibold text-slate-900">Transaction History</h3>
        <p className="text-sm text-slate-500">Recent credits and debits on your account</p>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Created</th>
              <th>Name</th>
              <th className="text-center">Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  No transactions yet
                </td>
              </tr>
            ) : (
              paginatedLogs.map((item, id) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * itemsPerPage + id + 1}</td>
                  <td>{moment(item.created).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="font-medium">{item.custoer}</td>
                  <td className="text-center font-semibold">${item.amount}</td>
                  <td>
                    <span className={getTypeBadge(item.type)}>{item.type}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="btn-secondary !py-2"
        >
          Previous
        </button>
        <span className="text-sm text-slate-500">Page {currentPage}</span>
        <button
          type="button"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage * itemsPerPage >= log.length}
          className="btn-secondary !py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionLog;
