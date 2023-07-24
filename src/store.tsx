// cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product: Object) =>
        set((state: any) => ({
          cart: [...state.cart, product],
        })),
      removeFromCart: (productId: Number) =>
        set((state: any) => ({
          cart: state.cart.filter((item: any) => item.id !== productId),
        })),
    }),
    {
      name: "cart-store", // Name of the localforage store
      getStorage: (): any => localforage,
    }
  )
);

export default useCartStore;
