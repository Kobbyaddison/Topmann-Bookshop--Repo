import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [q, setQ] = useState(initial);

  useEffect(() => { setQ(initial); }, [initial]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 flex w-full max-w-2xl items-center gap-2">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books, pens, journals…" className="input" />
      <button className="btn-primary" type="submit">Search</button>
    </form>
  );
}