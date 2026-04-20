"use server"


export const getUserOrders = async ( userId:string) => {

    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
};