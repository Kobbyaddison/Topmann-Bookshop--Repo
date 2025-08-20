import { Request, Response } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const list = async (req: Request, res: Response) => {
  const { q, page = 1, limit = 12, category } = req.query as any;
  const filter: any = {};
  if (q) filter.$text = { $search: q };
  if (category) filter.categories = category;
  const docs = await Product.find(filter)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort({ createdAt: -1 });
  const total = await Product.countDocuments(filter);
  res.json({ data: docs, total, page: +page, pages: Math.ceil(total / +limit) });
};

export const detail = async (req: Request, res: Response) => {
  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  // images can be attached via Cloudinary upload on admin UI, expecting array in body
  const prod = await Product.create(body);
  res.status(201).json(prod);
};

export const update = async (req: Request, res: Response) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!prod) return res.status(404).json({ message: 'Not found' });
  res.json(prod);
};

export const remove = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};

export const upsertCategory = async (req: Request, res: Response) => {
  const { name, slug, _id } = req.body;
  if (_id) {
    const c = await Category.findByIdAndUpdate(_id, { name, slug }, { new: true });
    return res.json(c);
  }
  const c = await Category.create({ name, slug });
  res.status(201).json(c);
};

export const categories = async (_req: Request, res: Response) => {
  const list = await Category.find().sort({ name: 1 });
  res.json(list);
};
