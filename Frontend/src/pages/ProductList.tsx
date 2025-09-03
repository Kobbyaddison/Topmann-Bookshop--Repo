import { useState } from 'react';
import CategoryPill from '../components/CategoryPill';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const categories = ['All', 'Books', 'Stationery', 'Art', 'Office'];
const allProducts: Product[] = Array.from({ length: 20 }).map((_, i) => ({
  _id: `p-${i + 1}`,
  name: `Product ${i + 1}`,
  price: 10 + i,
  category: categories[(i % (categories.length - 1)) + 1],
}));

export default function ProductList() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? allProducts : allProducts.filter((p) => p.category === active);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Products</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <CategoryPill key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p._id} {...p} />
        ))}
      </div>
    </div>
  );
}