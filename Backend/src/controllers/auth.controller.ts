import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response } from 'express';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { sendMail } from '../utils/mailer.js';
import { verifyEmailHtml } from '../utils/templates/verifyEmail.js';
import { resetPasswordHtml } from '../utils/templates/resetPassword.js';

function signAccess(user: any) {
  return jwt.sign({ _id: user._id, role: user.role }, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES });
}
function signRefresh(user: any) {
  return jwt.sign({ _id: user._id, role: user.role }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES });
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  const user = await User.create({ name, email, password: hash, emailVerificationToken });

  const link = `${env.CLIENT_URL}/verify-email?token=${emailVerificationToken}`;
  await sendMail({ to: email, subject: 'Verify your email', html: verifyEmailHtml(link, name) });

  res.status(201).json({ message: 'Registered. Check your email to verify.' });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query as any;
  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) return res.status(400).json({ message: 'Invalid token' });
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
  res.json({ message: 'Email verified' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: env.NODE_ENV === 'production' });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', secure: env.NODE_ENV === 'production' });
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified } });
};

export const refresh = async (_req: Request, res: Response) => {
  const token = _req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'Missing refresh token' });
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as any;
    const user = await User.findById(payload._id);
    if (!user) throw new Error();
    const accessToken = jwt.sign({ _id: user._id, role: user.role }, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES });
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: env.NODE_ENV === 'production' });
    res.json({ ok: true });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ ok: true });
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: 'If the email exists, a reset link has been sent.' });
  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  await user.save();
  const link = `${env.CLIENT_URL}/reset-password?token=${token}`;
  await sendMail({ to: email, subject: 'Reset your password', html: resetPasswordHtml(link, user.name) });
  res.json({ message: 'Reset link sent if the email exists.' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const user = await User.findOne({ resetPasswordToken: token });
  if (!user) return res.status(400).json({ message: 'Invalid token' });
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  await user.save();
  res.json({ message: 'Password updated' });
};
