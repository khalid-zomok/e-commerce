"use client";
import { getUserCart } from "@/actions/cart.action";
import { CartContextType, CartProduct } from "@/api/types/product.type";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

export const CartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  productIDS: [],
  setProductIDS: () => {},
  setNumOfCartItems: () => {},
  quantity: 1,
  setQuantity: () => {},
  getCart: async () => {}, // Default empty function
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
  const [productIDS, setProductIDS] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { data: session, status } = useSession();

  const getCart = useCallback(async () => {
    if (status !== "authenticated") {
      setNumOfCartItems(0);
      setProductIDS([]);
      return;
    }

    try {
      const res = await getUserCart();
      if (res?.data?.products) {
        let total = 0;
        const ids = res.data.products.map((item: CartProduct) => {
          total += item.count;
          return item.product.id;
        });
        setNumOfCartItems(total);
        setProductIDS(ids);
      }
    } catch (err) {
      console.error("Failed to fetch cart");
    }
  }, [status]); // Only changes if auth status changes

  useEffect(() => {
    getCart();
  }, [getCart, session?.user?.email]); // Re-fetch on login/logout or session change

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        productIDS,
        setProductIDS,
        quantity,
        setQuantity,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}