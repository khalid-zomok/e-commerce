"use client";
import { getWishlistProducts } from "@/actions/wishlist.action";
import { ProductType, WishlistContextType } from "@/api/types/product.type";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<WishlistContextType>({
  numOfWishlistItems: 0,
  setNumOfWishlistItems: () => {},
  itemsIDS: [],
  setItemsIDS: () => [],
});

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [itemsIDS, setItemsIDS] = useState<string[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getWishlist = async () => {
      if (status !== "authenticated") {
        setNumOfWishlistItems(0);
        setItemsIDS([]);
        return;
      }
      try {
        const res = await getWishlistProducts();
        setNumOfWishlistItems(res?.count);
        setItemsIDS(res?.data?.map((item: ProductType) => item.id));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Failed to fetch cart:", err.message);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    };
    getWishlist();
  }, [status, session?.id]);

  return (
    <WishlistContext.Provider
      value={{
        numOfWishlistItems,
        setNumOfWishlistItems,
        itemsIDS,
        setItemsIDS,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
