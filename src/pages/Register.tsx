import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, database } from '../firebase';
import { getRandomString } from '../Services/GetRandomNumber';
import { getusers } from '../Services/GetUser.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !number || !password || !confirmPassword) {
      setMessage('Incomplete information');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    getusers(email, (res: any[]) => {
      const existingUser = res.find((user) => user.email === email);
      if (existingUser) {
        window.alert('User already exists');
        return;
      }
    });

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userAuth = userCredential.user;

      const user = {
        id: userAuth.uid,
        firstname,
        lastname,
        email,
        phone: number,
        active: true,
        permission: 'admin',
        wallet: 0,
        created: serverTimestamp(),
        amountSpend: 0,
        accountNumber: '30' + getRandomString(8, '1234567890'),
        totalRequest: 0,
        totalSpent: 0,
      };

      await setDoc(doc(database, 'user', user.id), user);
      setMessage('Registration successful. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell flex items-center justify-center px-4 py-16">
      <div className="auth-card !max-w-lg">
        <div className="mb-8 text-center">
          <span className="section-label">Admin registration</span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Create admin account</h2>
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">First Name</label>
              <input type="text" className="input-field" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Last Name</label>
              <input type="text" className="input-field" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
            <input type="tel" className="input-field" value={number} onChange={(e) => setNumber(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm Password</label>
              <input type="password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
            {loading ? 'Creating...' : 'Register Admin'}
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
