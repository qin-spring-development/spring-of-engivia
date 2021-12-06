// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  interface Account {
    provider: string;
    type: string;
    id: string;
    accessToken: string;
    app_id: string;
    authed_user: {
      id: string;
      scope: string;
      access_token: string;
      token_type: string;
    };
  }
  interface Profile {
    ok: boolean;
    user: {
      name: string;
      email: string;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      image_1024: string;
    };
  }
  interface Session {
    user: User;
  }
}
