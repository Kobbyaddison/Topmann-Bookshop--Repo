import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = { _id: id!, name: 'Sample Product', price: 49.99, description: 'A great item to have in your collection.' };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img src={`https://picsum.photos/seed/${id}/800/600`} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-primary text-xl">₵{product.price.toFixed(2)}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <div className="mt-6 flex gap-3">
          <button className="btn-primary" onClick={() => addItem(product._id)}>Add to Cart</button>
          <button className="btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}