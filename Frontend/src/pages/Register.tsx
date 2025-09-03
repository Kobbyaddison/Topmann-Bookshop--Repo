import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/verify-email');
  };

  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <div className="hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-white md:block">
        <h2 className="text-3xl font-bold">Join Topman</h2>
        <p className="mt-2 text-blue-100">Create an account to save items and checkout faster.</p>
      </div>
      <form onSubmit={onSubmit} className="card p-6">
        <h3 className="text-xl font-semibold">Create Account</h3>
        <input className="input mt-4" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="input mt-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input mt-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary mt-4 w-full">Signup</button>
        <div className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></div>
      </form>
    </div>
  );
}