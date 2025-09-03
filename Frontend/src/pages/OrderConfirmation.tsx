import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <h2 className="text-2xl font-bold">Order Confirmed!</h2>
      <p className="mt-2 text-gray-600">Thanks for your purchase. A confirmation email has been sent.</p>
      <Link to="/products" className="btn-primary mt-6 inline-flex">Continue Shopping</Link>
    </div>
  );
}