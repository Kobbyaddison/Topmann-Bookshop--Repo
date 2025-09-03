import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary text-white grid place-content-center font-black">T</div>
          <span className="text-lg font-bold tracking-wide">TOPMAN BOOKSHOP</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Products' },
            { to: '/search', label: 'Search' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
            { to: '/help', label: 'Help' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn-secondary hidden md:inline-flex">Login</Link>
              <Link to="/register" className="btn-primary">Signup</Link>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/cart')} className="btn-secondary hidden sm:inline-flex">Cart</button>
              <button onClick={() => navigate('/profile')} className="btn-secondary hidden sm:inline-flex">Profile</button>
              <button onClick={logout} className="btn-primary">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}