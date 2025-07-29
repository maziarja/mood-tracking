import NextAuth, { type Session } from "next-auth";
import { type NextRequest } from "next/server";

import Google from "next-auth/providers/google";
import connectDB from "./database";
import User from "@/models/user";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { password: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        // logic to verify if the user exists
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).lean();

        if (!user) return null;

        if (typeof credentials.password !== "string") {
          throw new Error("Invalid password");
        }

        if (user.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isValid) return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      // for credential
      if (token) session.user.id = token.id as string;

      await connectDB();
      const currentUser = await User.findOne({
        email: session.user?.email,
      });
      if (currentUser && session.user) {
        session.user.id = currentUser._id.toString();
      }
      return session;
    },
  },

  pages: { signIn: "/sign-up" },
  session: { strategy: "jwt" },
} satisfies import("next-auth").NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
