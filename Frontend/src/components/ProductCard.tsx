import { Link } from "react-router-dom";
import { Product } from "../types";

export default function ProductCard({ _id, title, price, images }: Product) {

  const imageUrl =
    images?.length && images[0]?.url
      ? images[0].url
      : `https://picsum.photos/seed/${_id}/600/450`;

  return (
    <div className="card p-4">
      <Link to={`/products/seed/${_id}`} className="block">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-3">
          <h3 className="line-clamp-1 font-semibold">{title}</h3>
          <p className="mt-1 text-primary">₵{price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}


