import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import ProductList from '../pages/ProductList';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Account from '../pages/Account';
import Profile from '../pages/Profile';
import OrderConfirmation from '../pages/OrderConfirmation';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import NewPassword from '../pages/NewPassword';
import VerifyEmail from '../pages/VerifyEmail';
import Verification from '../pages/Verification';
import Contact from '../pages/Contact';
import Help from '../pages/Help';
import About from '../pages/About';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import ProtectedRoute from '../components/ProtectedRoute';
import TestConnection from '../pages/TestConnection';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="/account" element={<Account />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/test" element={<TestConnection />} />
    </Routes>
  );
}
