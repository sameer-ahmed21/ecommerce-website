import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setSubmitting(true);
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex justify-center">
      <div className="w-full max-w-md border border-slate-200 rounded-3xl p-8 sm:p-10 bg-white space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F0F0F0] rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F0F0F0] rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F0F0F0] rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Confirm Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#F0F0F0] rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white rounded-full py-3.5 font-medium hover:bg-slate-800 transition disabled:opacity-50"
          >
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-black underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
