import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate(location.state?.from?.pathname || '/');
  };

  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <div className="hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-white md:block">
        <h2 className="text-3xl font-bold">Welcome back</h2>
        <p className="mt-2 text-blue-100">Access your account to track orders and manage your cart.</p>
      </div>
      <form onSubmit={onSubmit} className="card p-6">
        <h3 className="text-xl font-semibold">Login</h3>
        <input className="input mt-4" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input mt-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary mt-4 w-full">Login</button>
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Login</Link>
        <div className="mt-3 text-center text-sm text-gray-600">
          <Link to="/reset-password" className="hover:text-primary">Forgot password?</Link>
        </div>
        <div className="mt-4 text-center text-sm">No account? <Link to="/register" className="text-primary hover:underline">Create one</Link></div>
      </form>
    </div>
  );
}