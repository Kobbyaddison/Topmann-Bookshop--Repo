import { Schema, model, Types } from 'mongoose';

const CartSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, default: 1, min: 1 }
  }]
}, { timestamps: true });

export default model('Cart', CartSchema);
