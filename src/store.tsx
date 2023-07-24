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
      updateQty: (id: number, qty: any) =>
        set((state: any) => ({
          cart: state.cart.map((item: any) => {
            if (item.id === id) {
              return { ...item, quantity: qty };
            } else {
              return item;
            }
          }),
        })),
    }),
    {
      name: "cart-store", // Name of the localforage store
      getStorage: (): any => localforage,
    }
  )
);

export default useCartStore;
