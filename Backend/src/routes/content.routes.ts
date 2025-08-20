import { Router } from 'express';

const r = Router();

// Static content for Help, About, Terms, Privacy, Contact Us.
// Replace with CMS later if desired.

r.get('/help', (_req, res) => res.json({ faqs: [
  { q: 'How do I reset my password?', a: 'Use the "Forgot Password" link on the Login page.' },
  { q: 'Where is my order?', a: 'Visit Account → Orders to track status.' }
]}));

r.get('/about', (_req, res) => res.json({
  title: 'About Topman Bookshop',
  body: 'We are a modern online bookstore delivering to Ghana and beyond.'
}));

r.get('/terms', (_req, res) => res.json({ title: 'Terms and Conditions', body: 'Your standard terms live here.' }));

r.get('/privacy', (_req, res) => res.json({ title: 'Privacy Policy', body: 'We respect your privacy and only use data to fulfill orders.' }));

r.post('/contact', (req, res) => {
  // For now, just echo. Optionally relay via email using utils/mailer.ts
  res.json({ received: true, message: 'Thanks for contacting us!' });
});

export default r;
