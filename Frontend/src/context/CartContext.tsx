import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../utils/api";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    api.getCart().then(res => setItems(res.data.items || []));
  }, []);

  const addItem = async (productId: string, quantity = 1) => {
    await api.addToCart({ productId, quantity });
    const res = await api.getCart();
    setItems(res.data.items);
  };

  const removeItem = async (productId: string) => {
    await api.removeFromCart(productId);
    const res = await api.getCart();
    setItems(res.data.items);
  };

  const clearCartItems = async () => {
    await api.clearCart();
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart: clearCartItems, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};