"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getMyToken = async () => {
    try {
    // We check both because Vercel uses __Secure- on HTTPS
    const cookieStore = await cookies();
    const decodedToken =
      cookieStore.get("next-auth.session-token")?.value ||
      cookieStore.get("__Secure-next-auth.session-token")?.value;

    if (!decodedToken) return null;

    const tokenData = await decode({
      token: decodedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    // IMPORTANT: Use 'routeToken' to match your authOptions configuration
    return tokenData?.routeToken || null;
    
  } catch (err) {
    console.error("Token decoding failed:", err);
    return null;
  }
}



// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export const getMyToken = async () => {
//   const cookie = await cookies();
//   const myToken = cookie.get("next-auth.session-token")?.value;
//   const decodedToken = await decode({
//     token: myToken,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });
//   const token = decodedToken?.routeToken;
//   return token;
// };
