import { Request, Response } from 'express';
import User from '../models/User.js';

export const me = async (req: Request, res: Response) => {
  const user = await User.findById(req.user!._id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ id: user._id, name: user.name, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified, addresses: user.addresses, avatarUrl: user.avatarUrl });
};

export const upsertAddress = async (req: Request, res: Response) => {
  const user = await User.findById(req.user!._id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  const address = req.body;
  if (address._id) {
    const idx = user.addresses.findIndex((a: any) => a._id?.toString() === address._id);
    if (idx >= 0) user.addresses[idx] = { ...user.addresses[idx].toObject(), ...address };
  } else {
    user.addresses.push(address);
  }
  if (address.default) {
    user.addresses.forEach((a: any) => (a.default = a._id?.toString() === (address._id || user.addresses[user.addresses.length - 1]._id).toString()));
  }
  await user.save();
  res.json(user.addresses);
};
