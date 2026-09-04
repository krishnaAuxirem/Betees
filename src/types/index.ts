export type UserRole = "customer" | "designer" | "tailor" | "brand" | "creator" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isOnboarded: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  aiMatch?: number;
  fabric?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  tags?: string[];
  sizes?: string[];
}

export interface Designer {
  id: string;
  name: string;
  studio: string;
  location: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  verified: boolean;
  portfolio?: string[];
}

export interface Order {
  id: string;
  product: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  amount: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface Notification {
  id: string;
  type: "order" | "style" | "offer" | "system";
  message: string;
  time: string;
  read: boolean;
}
