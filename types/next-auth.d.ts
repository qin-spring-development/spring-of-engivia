import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    name: string;
    provider: string;
    image: string;
  }
  interface Session {
    user: User;
  }
}
