import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="container mx-auto flex-1 px-4 py-6">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
