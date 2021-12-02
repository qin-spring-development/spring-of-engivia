import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Providers from "next-auth/providers";
import { createUser, getUser, ReqUser, ResUser } from "src/lib/users";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Slack({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
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
      const firebaseUser = await getUser(token.user.id);
      session.user = firebaseUser as User;
      return Promise.resolve(session);
    },
    signIn: async (user: User, account: Account, profile: Profile) => {
      if (user !== null) {
        (await getUser(user.id)) ?? createUser(toReqUser(user, account));
        const data = await getUser(user.id);
        setResUser(user, data as ResUser);
        return true;
      } else {
        return false;
      }
    },
  },
};

const toReqUser = (user: User, account: Account) => {
  const reqUser: ReqUser = {
    id: user.id,
    email: user.email,
    name: user.name,
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

export default (req: any, res: any) => NextAuth(req, res, options);
