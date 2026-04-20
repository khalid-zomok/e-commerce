"use server";

import { CheckoutFormData } from "@/schemas/checkout.address";
import { getMyToken } from "@/utilities";

export const paymentOnline = async (
  cartId: string,
  url: string = process.env.NEXTAUTH_URL!,
  data: CheckoutFormData,
) => {
  const token = await getMyToken();
  try {
    if (!token) {
      throw new Error("please login first.....");
    }
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        method: "post",
        body: JSON.stringify({
          shippingAddress: data,
        }),
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};


export const paymentCash = async (
  cartId: string,
  data:CheckoutFormData,
) => {
  const token = await getMyToken();
  try {
    if (!token) {
      throw new Error("please login first.....");
    }
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      {
        method: "post",
        body: JSON.stringify({
          shippingAddress: {...data,postalCode: "12345"} ,
        }),
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};