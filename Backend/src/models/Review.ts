import { Schema, model, Types } from 'mongoose';

const ReviewSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

export default model('Review', ReviewSchema);
