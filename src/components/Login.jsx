import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(location.state?.from?.pathname || '/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex justify-center">
      <div className="w-full max-w-md border border-slate-200 rounded-3xl p-8 sm:p-10 bg-white space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight">Log In</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F0F0F0] rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white rounded-full py-3.5 font-medium hover:bg-slate-800 transition disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-black underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
