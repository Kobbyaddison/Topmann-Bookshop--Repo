import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { total, clearCart } = useCart();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    window.location.href = '/order-confirmation';
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-3">
      <div className="card space-y-4 p-6 md:col-span-2">
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" placeholder="Full Name" required />
          <input className="input" placeholder="Phone" required />
          <input className="input md:col-span-2" placeholder="Address" required />
          <input className="input" placeholder="City" required />
          <input className="input" placeholder="Region" required />
        </div>
        <h2 className="mt-6 text-xl font-semibold">Payment</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" placeholder="Card Number" required />
          <input className="input" placeholder="Name on Card" required />
          <input className="input" placeholder="Expiry (MM/YY)" required />
          <input className="input" placeholder="CVC" required />
        </div>
        <button className="btn-primary mt-6">Place Order</button>
      </div>
      <aside className="card h-max p-6">
        <h3 className="text-lg font-semibold">Summary</h3>
        <div className="mt-4 flex justify-between"><span>Total</span><span className="font-semibold">₵{total.toFixed(2)}</span></div>
      </aside>
    </form>
  );
}