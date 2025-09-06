import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://topman-bookshop.onrender.com",
  withCredentials: true, // send httpOnly cookies
});

// ----------------- AUTH -----------------
export const register = (data: { email: string; password: string }) =>
  api.post("/auth/register", data);

export const verifyEmail = (token: string) =>
  api.get(`/auth/verify-email?token=${token}`);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const refresh = () => api.post("/auth/refresh");

export const logout = () => api.post("/auth/logout");

export const requestPasswordReset = (data: { email: string }) =>
  api.post("/auth/request-reset", data);

export const resetPassword = (data: { token: string; password: string }) =>
  api.post("/auth/reset-password", data);

export const getMe = () => api.get("/users/me");

export const addAddress = (data: { address: string }) =>
  api.post("/users/addresses", data);

// ----------------- PRODUCTS -----------------
export const getProducts = (params?: {
  q?: string;
  page?: number;
  limit?: number;
  category?: string;
}) => api.get("/products", { params });

export const getProductById = (id: string) => api.get(`/products/${id}`);

export const getCategories = () => api.get("/products/categories");

// ----------------- CART -----------------
export const getCart = () => api.get("/cart");

export const addToCart = (data: { productId: string; quantity: number }) =>
  api.post("/cart/item", data);

export const removeFromCart = (productId: string) =>
  api.delete(`/cart/item/${productId}`);

export const clearCart = () => api.delete("/cart");

// ----------------- ORDERS -----------------
export const checkout = (data: {
  items: { productId: string; quantity: number }[];
  addressId: string;
}) => api.post("/orders/checkout", data);

export const getMyOrders = () => api.get("/orders/mine");

export const getOrderById = (id: string) => api.get(`/orders/${id}`);
