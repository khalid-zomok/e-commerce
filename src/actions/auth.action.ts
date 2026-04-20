"use server"
import { LoginSchemaType, RegisterSchemaType } from "@/schemas/auth.register";


export const userREgister = async (data:RegisterSchemaType) =>{
     try{
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
      method: "POST",
      body: JSON.stringify(data), // Only send the fields the API expects
      headers: { "Content-Type": "application/json" },
      })
      const result = await res.json();
      console.log(result);
      return res.ok

    }catch(err){
      console.log(err);
      
    }
}

export const userLogin = async (data:LoginSchemaType) =>{
     try{
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
      method: "POST",
      body: JSON.stringify(data), // Only send the fields the API expects
      headers: { "Content-Type": "application/json" },
      })
      const result = await res.json();
      console.log(result);
      return res.ok

    }catch(err){
      console.log(err);
      
    }
}