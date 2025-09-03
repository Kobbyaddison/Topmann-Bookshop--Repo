import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Link } from 'react-router-dom';

const demoProducts: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  _id: String(i + 1),
  name: `Featured Item ${i + 1}`,
  price: 25 + i * 3,
}));

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />
      <div className="flex flex-col items-center">
        <SearchBar />
        <div className="mt-2 text-sm text-gray-500">Try "pen", "notebook", "math set"…</div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {demoProducts.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="mt-2 text-sm text-gray-600">Get your items quickly and reliably.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Secure Payments</h3>
          <p className="mt-2 text-sm text-gray-600">Trusted gateways to keep you safe.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Great Support</h3>
          <p className="mt-2 text-sm text-gray-600">We’re here to help when you need us.</p>
        </div>
      </section>
    </div>
  );
}