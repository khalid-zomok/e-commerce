"use client";
import { addProductToCart, updateProductQuantity } from "@/actions/cart.action";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function AddButton({
  classes,
  icon,
  afterAdded,
  productId,
}: {
  classes: string;
  icon: React.ReactNode;
  afterAdded: React.ReactNode[];
  productId: string;
}) {
  const { productIDS, quantity, getCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCartAction = async () => {
    setIsLoading(true);
    try {
      const isAlreadyInCart = productIDS.includes(productId);
      
      // Select the correct Server Action
      const res = isAlreadyInCart 
        ? await updateProductQuantity(productId, quantity) 
        : await addProductToCart(productId);

      if (res.status) {
        setIsSuccess(true);
        toast.success(res.message, { position: "top-center" });

        // CRITICAL: Fetch the latest truth from the server
        await getCart();

        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCartAction}
      className={classes}
      disabled={isLoading}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin" />
      ) : isSuccess ? (
        <>{afterAdded[1]}</>
      ) : (
        <>
          {icon}
          <span>{afterAdded[0]}</span>
        </>
      )}
    </button>
  );
}