/*     eslint-disable  */


import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    password: string;
    accessToken: string;
  }
  
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string | undefined;
    };

    expires: string
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    routeToken:string
  }
}