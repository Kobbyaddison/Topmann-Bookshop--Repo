import { useState } from 'react';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/login';
  };
  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-md p-6">
      <h3 className="text-xl font-semibold">Set New Password</h3>
      <input className="input mt-4" placeholder="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input className="input mt-3" placeholder="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      <button className="btn-primary mt-4 w-full">Update Password</button>
    </form>
  );
}