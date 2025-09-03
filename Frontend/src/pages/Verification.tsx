import { useState } from 'react';

export default function Verification() {
  const [code, setCode] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/new-password';
  };
  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-sm p-6 text-center">
      <h3 className="text-xl font-semibold">Enter verification code</h3>
      <input className="input mt-4 text-center" placeholder="123456" value={code} onChange={(e) => setCode(e.target.value)} required />
      <button className="btn-primary mt-4 w-full">Verify</button>
    </form>
  );
}