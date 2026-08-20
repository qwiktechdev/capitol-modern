import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp, query, collection, getDocs, where } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { User } from '../Interface/MainInterface';
import { getRandomString } from '../Services/GetRandomNumber';

interface SideMenuProps {
  user: User;
}

const TransferForm: React.FC<SideMenuProps> = ({ user }) => {
  const [transferType, setTransferType] = useState<'local' | 'international'>('local');
  const [bankName, setBankName] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftBicIban, setSwiftBicIban] = useState('');
  const [accountName, setAccountName] = useState('');
  const [holderAddress, setHolderAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState('');
  const [pin, setPin] = useState('');
  const [balance, setUSerbalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const fetchAccountName = async (acctNumber: string) => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const q = query(collection(database, 'user'), where('accountNumber', '==', acctNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage('No user found with this account number.');
        return;
      }

      const userData = querySnapshot.docs[0].data();
      if (userData?.firstname && userData?.lastname) {
        setAccountName(`${userData.firstname} ${userData.lastname}`);
        setUSerbalance(userData.wallet);
      } else {
        setErrorMessage('User data is incomplete.');
      }
    } catch (error) {
      setErrorMessage('Error fetching account information.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const id = getRandomString(34, '1234567890qqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM');
    try {
      await setDoc(doc(database, 'transfers', id), {
        bankName,
        bankAddress,
        accountNumber,
        routingNumber,
        swiftBicIban,
        accountName,
        holderAddress,
        amount,
        narration,
        pin,
        transferType,
        userId: user.id,
        id,
        balance,
        userRole: user.permission,
        createdAt: serverTimestamp(),
        status: 'Pending',
        closed: false,
      });
      setSuccessMessage('Transfer submitted successfully!');
    } catch (error) {
      setErrorMessage('Failed to submit transfer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    const token = window.localStorage.getItem('token');
    navigate(`/transfer-history/${token}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {user?.permission === 'admin' && (
        <button type="button" onClick={handleViewHistory} className="btn-secondary mb-6">
          View Transfer History
        </button>
      )}

      <div className="card">
        <h2 className="text-xl font-bold text-slate-900">Transfer Form</h2>
        <p className="mt-1 text-sm text-slate-500">Complete the details below to initiate a transfer</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-sm font-medium text-slate-700">Type of Transfer:</p>
          <div className="flex gap-4">
            {(['local', 'international'] as const).map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="transferType"
                  value={type}
                  checked={transferType === type}
                  onChange={() => setTransferType(type)}
                  className="accent-brand-600"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {[
            { label: 'Bank Name', value: bankName, setter: setBankName },
            { label: 'Bank Address', value: bankAddress, setter: setBankAddress },
            { label: 'Account Number', value: accountNumber, setter: setAccountNumber, onChangeExtra: (v: string) => { if (v.length === 10) fetchAccountName(v); } },
            { label: 'Routing Number', value: routingNumber, setter: setRoutingNumber },
            { label: "Holder's Address", value: holderAddress, setter: setHolderAddress },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => {
                  field.setter(e.target.value);
                  field.onChangeExtra?.(e.target.value);
                }}
                className="input-field"
              />
            </div>
          ))}

          {transferType === 'international' && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">SWIFT/BIC/IBAN</label>
              <input type="text" value={swiftBicIban} onChange={(e) => setSwiftBicIban(e.target.value)} className="input-field" />
              <p className="mt-1 text-xs text-slate-400">For international transfers only</p>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Account Name</label>
            <input type="text" value={accountName} className="input-field !bg-slate-50" disabled />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Amount</label>
            <input type="tel" placeholder="0" onChange={(e) => setAmount(parseFloat(e.target.value))} className="input-field" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Narration</label>
            <textarea value={narration} onChange={(e) => setNarration(e.target.value)} className="textarea-field h-24" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">PIN</label>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="input-field" />
          </div>

          {successMessage && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>}
          {errorMessage && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
            {loading ? 'Submitting...' : 'Submit Transfer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
