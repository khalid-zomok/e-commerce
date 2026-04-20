"use server"
import { getMyToken } from "@/utilities";

export const addProductToWishlist = async (productId:string ) => {
 const token = await getMyToken()

    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "post",
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
export const getWishlistProducts = async ( ) => {
 const token = await getMyToken()
    try {
       if(!token){
        throw new Error("please login first.....")
      }
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "get",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
};
export const removeWishlistProduct = async ( id:string) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
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