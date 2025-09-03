import { Link } from 'react-router-dom';
import { Product } from '../types';

export default function ProductCard({ _id, name, price, image }: Product) {
  return (
    <div className="card p-4">
      <Link to={`/products/${_id}`} className="block">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore demo placeholder */}
          <img src={image || `https://picsum.photos/seed/${_id}/600/450`} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="mt-3">
          <h3 className="line-clamp-1 font-semibold">{name}</h3>
          <p className="mt-1 text-primary">₵{price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}