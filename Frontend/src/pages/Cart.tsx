import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, total } = useCart();

  if (!items.length) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        {items.map((i) => (
          <div key={i. productId} className="card flex items-center gap-4 p-4">
            <img src={`https://picsum.photos/seed/${i. productId}/120/90`} className="h-20 w-28 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="font-semibold">{i.name}</div>
              <div className="text-sm text-gray-600">Qty: {i.quantity}</div>
            </div>
            <div className="font-semibold">₵{(i.price * i.quantity).toFixed(2)}</div>
            <button onClick={() => removeItem(i. productId)} className="btn-secondary">Remove</button>
          </div>
        ))}
      </div>
      <aside className="card h-max p-6">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <div className="mt-4 flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">₵{total.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="btn-primary mt-6 block text-center">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}