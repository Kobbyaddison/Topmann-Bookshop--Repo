import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
});

export async function sendMail(opts: { to: string; subject: string; html: string; }) {
  return transporter.sendMail({ from: env.MAIL_FROM, ...opts });
}
