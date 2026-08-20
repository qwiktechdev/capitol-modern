import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '../Interface/MainInterface';
import { database } from '../firebase';
import { getRandomString } from '../Services/GetRandomNumber';
import { useNavigate } from 'react-router-dom';

interface props {
  user: User;
}

const LoanRequestForm: React.FC<props> = ({ user }) => {
  const [fullName, setFullName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loanPurpose, setLoanPurpose] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const id = getRandomString(34, '1234567890qqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM');
    const formData = {
      fullName,
      address,
      loanAmount,
      phone,
      email,
      loanPurpose,
      id,
      userRole: user.permission,
      createdAt: serverTimestamp(),
      status: 'Pending',
      closed: false,
    };

    try {
      await setDoc(doc(database, 'loanRequests', id), formData);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    const token = window.localStorage.getItem('token');
    navigate(`/loan-history/${token}`);
  };

  return (
    <div className="mx-auto max-w-lg">
      {user?.permission === 'admin' && (
        <button type="button" onClick={handleViewHistory} className="btn-secondary mb-6">
          View Loan History
        </button>
      )}

      <form onSubmit={handleSubmit} className="card">
        <h1 className="text-xl font-bold text-slate-900">Loan Request</h1>
        <p className="mt-1 text-sm text-slate-500">Fill in your details to apply for a loan</p>

        <div className="mt-6 space-y-4">
          {[
            { label: 'Full Name', type: 'text', value: fullName, setter: setFullName },
            { label: 'Phone', type: 'tel', value: phone, setter: setPhone },
            { label: 'Email', type: 'email', value: email, setter: setEmail },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{field.label}</label>
              <input type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)} className="input-field" required />
            </div>
          ))}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Residential Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="textarea-field h-24" required />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Loan Amount</label>
            <input type="tel" placeholder="0" onChange={(e) => setLoanAmount(parseFloat(e.target.value))} className="input-field" required />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Purpose of Loan</label>
            <textarea value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} className="textarea-field h-24" required />
          </div>

          {success === true && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Your request has been submitted successfully!</p>}
          {success === false && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">There was an error submitting your request.</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanRequestForm;
