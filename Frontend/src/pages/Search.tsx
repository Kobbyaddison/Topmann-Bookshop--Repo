import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const q = useQuery().get('q') || '';
  const results: Product[] = Array.from({ length: 6 }).map((_, i) => ({
    _id: `${q}-${i + 1}`,
    name: `${q || 'Item'} Result ${i + 1}`,
    price: 15 + i * 2,
  }));

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Search results for “{q}”</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p._id} {...p} />
        ))}
      </div>
    </div>
  );
}