import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  cartCount: number;
  wishlistCount: number;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setCartCount: (count: number) => void;
  addToCart: () => void;
  addToWishlist: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      cartCount: 0,
      wishlistCount: 0,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, cartCount: 0, wishlistCount: 0 }),
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
      setCartCount: (count) => set({ cartCount: count }),
      addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
      addToWishlist: () => set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
    }),
    {
      name: "betees-auth",
    }
  )
);
