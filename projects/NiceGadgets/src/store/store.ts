import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Model } from '../types/Model';
import { CartItem } from '../types/CartItem';

interface StoreState {
  cart: CartItem[];
  favorites: Model[];

  addToCart: (product: Model) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;

  addToFavorites: (product: Model) => void;
  removeFromFavorites: (id: number) => void;
  isInFavorites: (id: number) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],

      addToCart: product => {
        if (!get().isInCart(product.id)) {
          set(state => ({
            cart: [...state.cart, { ...product, quantity: 1 }],
          }));
        }
      },

      removeFromCart: id => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== id),
        }));
      },

      isInCart: id => get().cart.some(item => item.id === id),

      increaseQuantity: id => {
        set(state => ({
          cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },

      decreaseQuantity: id => {
        set(state => ({
          cart: state.cart.map(item =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        }));
      },

      addToFavorites: product => {
        if (!get().isInFavorites(product.id)) {
          set(state => ({
            favorites: [...state.favorites, product],
          }));
        }
      },

      removeFromFavorites: id => {
        set(state => ({
          favorites: state.favorites.filter(item => item.id !== id),
        }));
      },

      isInFavorites: id => get().favorites.some(item => item.id === id),
    }),
    {
      name: 'cart-and-favorites',
    },
  ),
);
