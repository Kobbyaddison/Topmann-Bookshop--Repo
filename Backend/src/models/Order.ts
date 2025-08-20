import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    title: String,
    price: Number,
    qty: Number
  }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  currency: { type: String, default: 'usd' },
  addressSnapshot: Object,
  payment: {
    provider: { type: String, default: 'stripe' },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    intentId: String
  },
  status: { type: String, enum: ['created', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'created' }
}, { timestamps: true });

export default model('Order', OrderSchema);
