import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary px-6 py-16 text-white md:px-12">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">TOPMAN BOOKSHOP</h1>
        <p className="mt-4 text-lg text-blue-100">Discover books, stationery, and supplies curated for learners and creators.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/products" className="btn bg-white text-primary hover:bg-blue-50">Get Started</Link>
          <Link to="/login" className="btn border border-white text-white hover:bg-white hover:text-primary">Login</Link>
          <Link to="/register" className="btn border border-white text-white hover:bg-white hover:text-primary">Signup</Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
    </section>
  );
}
