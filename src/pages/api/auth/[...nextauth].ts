import { auth } from "src/lib/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Providers from "next-auth/providers";
import { adminAuth } from "src/lib/firebase-admin";
import {
  createUser,
  createUserToken,
  getUser,
  ReqUser,
  ResUser,
} from "src/lib/users";
import { toHash } from "src/lib/auth/hash";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Slack({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
    }),
    // ユーザー情報更新時の再ログイン
    Providers.Credentials({
      authorize: async (credentials) => {
        const { id, email } = credentials;

        await customTokenSignIn(id, email);
        const firebaseUser = (await getUser(id)) as User;
        return firebaseUser;
      },
    }),
  ],
  callbacks: {
    jwt: async (token: any, user: User, account: Account, profile: Profile) => {
      if (user) {
        token.user = user;
        token.account = account;
        token.profile = profile;
      }
      return Promise.resolve(token);
    },
    session: async (session: Session, token: any) => {
      session.user = token.user;
      return Promise.resolve(session);
    },
    signIn: async (user: User, account: Account) => {
      try {
        if (user !== null) {
          await customTokenSignIn(user.id, user.email);

          (await getUser(user.id)) ?? createUser(toReqUser(user, account));
          const data = await getUser(user.id);
          setResUser(user, data as ResUser);
          return true;
        }
        return false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};

const customTokenSignIn = async (id: string, email: string) => {
  const hash = toHash(id);
  const customToken = await adminAuth.createCustomToken(hash);

  await auth.signInWithCustomToken(customToken).then((res) => {
    res.user?.updateEmail(email);
  });
  await adminAuth.setCustomUserClaims(hash, { sid: id });

  await createUserToken({ id: id, firebaseUid: hash });
};

const toReqUser = (user: User, account: Account) => {
  const reqUser: ReqUser = {
    id: user.id,
    email: user.email,
    name: user.name.slice(0, 21),
    image: user.image,
    provider: account.provider,
  };
  return reqUser;
};

const setResUser = (user: User, resUser: ResUser) => {
  user.id = resUser.id;
  user.email = resUser.email;
  user.isAdmin = resUser.isAdmin;
  user.name = resUser.name;
  user.provider = resUser.provider;
  user.image = resUser.image;
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
