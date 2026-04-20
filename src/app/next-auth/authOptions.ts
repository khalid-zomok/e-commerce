import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Facebook from "next-auth/providers/facebook";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "myLogin",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }), // Only send the fields the API expects
              headers: { "Content-Type": "application/json" },
            },
          );
          const result = await res.json();
          console.log(result);
          if (!res.ok) {
            throw new Error(result.message);
          }

          const jwt: { id: string } = jwtDecode(result.token);
          console.log(jwt);

          return {
            id: jwt.id,
            email: result.user.email,
            name: result.user.name,
            password: result.user.password,
            accessToken: result.token,
          };
        } catch (err) {
          console.log(err);
          throw new Error((err as Error).message);
        }
      },
    }),
    // Facebook:({

    // })
  ],
  callbacks: {
    jwt(param) {
      if (param.user) {
        param.token.routeToken = param.user.accessToken;
        param.token.id = param.user.id;
        param.token.name = param.user.name;
      }
      return param.token;
    },
    session({session , token}) {
      session.id = token.id as string;
      session.user.name = token.name as string;
      
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
};
