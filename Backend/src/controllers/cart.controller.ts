import { Request, Response } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

async function getOrCreateCart(userId: string) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

export const getCart = async (req: Request, res: Response) => {
  const cart = await getOrCreateCart(req.user!._id);
  res.json(cart);
};

export const upsertItem = async (req: Request, res: Response) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const cart = await getOrCreateCart(req.user!._id);
  const idx = cart.items.findIndex((i: any) => i.product.toString() === productId);
  if (idx >= 0) cart.items[idx].qty = qty; else cart.items.push({ product: productId, qty });
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

export const removeItem = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const cart = await getOrCreateCart(req.user!._id);
  cart.items = cart.items.filter((i: any) => i.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

export const clearCart = async (req: Request, res: Response) => {
  const cart = await getOrCreateCart(req.user!._id);
  cart.items = [];
  await cart.save();
  res.json(cart);
};
