import { Session } from "inspector";
import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Slack({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect(url: string, baseUrl: string) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/broadcast`;
    },

    session: async (session: any, user: User) => {
      session.user.id = "aaaaa";
      return Promise.resolve(session);
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
