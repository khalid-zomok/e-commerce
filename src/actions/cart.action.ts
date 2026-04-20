"use server";
import { getMyToken } from "@/utilities";
export const addProductToCart = async (productId: string) => {
 const token = await getMyToken()


    try {
      if(!token){
        throw new Error("please login first.....")
      }
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "POST",
        body: JSON.stringify({ productId: productId }), // Only send the fields the API expects
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
};

export const getUserCart = async () => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "Get",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
};

export const clearAllCartItems = async () => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "delete",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
};
export const removeProductCart = async (productId:string) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "delete",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
};
export const updateProductQuantity = async (productId:string ,count :number) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "put",
        body: JSON.stringify({ count: count }), // Only send the fields the API expects
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
};
