import { NextApiHandler } from "next";
import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@lib/prisma";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 40000
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 40000
      }
    })
  ],
  callbacks: {
    async session({
      session,
      user
    }: {
      session: Session;
      user: {
        id: string;
        name?: string | undefined | null;
        email?: string | undefined | null;
        image?: string | undefined | null;
      };
    }) {
      // Send properties to the client, like user id from a provider.
      if (session != undefined && session.user != undefined) {
        session.user.id = user.id;
        session.user.image = user.image;
      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET
};
