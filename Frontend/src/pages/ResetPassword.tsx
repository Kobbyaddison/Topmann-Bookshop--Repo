import { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/verification';
  };
  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-md p-6">
      <h3 className="text-xl font-semibold">Reset Password</h3>
      <input className="input mt-4" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button className="btn-primary mt-4 w-full">Send Reset Link</button>
    </form>
  );
}