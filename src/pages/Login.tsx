import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from '../comp/Navbar';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const login = async (email: string, password: string) => {
    if (email === '' || password === '') {
      window.alert('Email and password are required');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const db = getFirestore();
      const userRef = doc(db, 'user', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (!userData.active) {
          toast.error('Account suspended. Contact admin.');
          return;
        }

        window.localStorage.setItem('token', user.uid);
        toast.success('Login successful');
        window.location.href = '/auth/dashboard';
      } else {
        toast.error('User data not found.');
      }
    } catch (error: any) {
      toast.error('Invalid username or password');
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="auth-shell flex items-center justify-center px-4 py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/image/c13.jpg')" }}
        />
        <div className="auth-card">
          <div className="mb-8 text-center">
            <span className="section-label">Welcome back</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-slate-500">Access your dashboard and manage your finances</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? 'Please wait...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
