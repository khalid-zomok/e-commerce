"use server"

import { AddressFormValues } from "@/schemas/profile.address";
import { getMyToken } from "@/utilities";

export const addAddressTOMyProfile = async (data:AddressFormValues) => {
 const token = await getMyToken()
console.log(token);
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "post",
        body: JSON.stringify(data), // Only send the fields the API expects
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
      return { status: "error", message: "Network connection failed" };
    }
};





export const getAllUserAddresses = async () => {
 const token = await getMyToken()
console.log(token);
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "get",
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



export const removeAddresse = async (id:string) => {
 const token = await getMyToken()
console.log(token);
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
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