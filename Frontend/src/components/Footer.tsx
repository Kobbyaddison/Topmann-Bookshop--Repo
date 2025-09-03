import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary text-white grid place-content-center font-black">T</div>
            <span className="text-lg font-bold">TOPMAN BOOKSHOP</span>
          </div>
          <p className="text-sm text-gray-600">Your one‑stop shop for books, stationery, and learning materials.</p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/help" className="hover:text-primary">Help</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Get Started</h4>
          <div className="flex flex-wrap gap-2">
            <Link to="/register" className="btn-primary">Signup</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Topman Bookshop. All rights reserved.</div>
    </footer>
  );
}