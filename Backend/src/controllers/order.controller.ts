import { Request, Response } from 'express';
import Stripe from 'stripe';
import { env } from '../config/env.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

export const checkout = async (req: Request, res: Response) => {
  const { addressId, shipping = 0, currency = 'usd' } = req.body;
  const user = await User.findById(req.user!._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const address = user.addresses.id(addressId);
  if (!address) return res.status(400).json({ message: 'Address not found' });

  const cart = await Cart.findOne({ user: req.user!._id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart empty' });

  const items = cart.items.map((i: any) => ({
    product: i.product._id,
    title: i.product.title,
    price: i.product.price,
    qty: i.qty
  }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + shipping;

  const order = await Order.create({
    user: user._id,
    items,
    subtotal,
    shipping,
    total,
    currency,
    addressSnapshot: address,
    payment: { status: 'pending', provider: 'stripe' },
    status: 'created'
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: items.map((i) => ({
      price_data: { currency, product_data: { name: i.title }, unit_amount: Math.round(i.price * 100) },
      quantity: i.qty
    })),
    success_url: `${env.CLIENT_URL}/order-confirmation?orderId=${order._id}`,
    cancel_url: `${env.CLIENT_URL}/cart`,
    metadata: { orderId: String(order._id) }
  });

  order.payment.intentId = session.id;
  await order.save();
  res.json({ checkoutUrl: session.url, orderId: order._id });
};

export const webhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent((req as any).rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const orderId = session.metadata.orderId;
    const order = await Order.findById(orderId);
    if (order) {
      order.payment.status = 'paid';
      order.status = 'processing';
      await order.save();
      // Optional: clear cart
      await Cart.findOneAndUpdate({ user: order.user }, { items: [] });
    }
  }
  res.json({ received: true });
};

export const myOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user!._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const detail = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (String(order.user) !== req.user!._id && req.user!.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  res.json(order);
};
