"use server"

import { ChangePasswordFormData } from "@/schemas/changePassword";
import { ForgetPasswordType, ResetPasswordType, VerifyCodeType } from "@/schemas/forgetPassword";
import { getMyToken } from "@/utilities";

export const ChangePassword = async (data:ChangePasswordFormData) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
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


export const sendEmail = async (data:ForgetPasswordType) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        method: "post",
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
export const sendCode = async (data:VerifyCodeType) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: "post",
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
export const sendNewPassword = async (data:ResetPasswordType) => {
 const token = await getMyToken()
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
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