"use server"

import { ProfileInformationType } from "@/schemas/profile.information";
import { getMyToken } from "@/utilities";

export const updateUserData = async (data:ProfileInformationType) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
        method: "put",
        body: JSON.stringify( data ), // Only send the fields the API expects
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