import { Schema, model, Types } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true, index: 'text' },
  author: String,
  description: String,
  images: [{ url: String, publicId: String }],
  price: { type: Number, required: true },
  compareAtPrice: Number,
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true },
  categories: [{ type: Types.ObjectId, ref: 'Category' }],
  ratingAvg: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

export default model('Product', ProductSchema);
