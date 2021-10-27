import NextAuth from "next-auth";
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
    async redirect(url: string) {
      return url;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
