import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { connectDb } from '@/lib/connectDb';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;

        // If login via OAuth (Google or GitHub), check DB for user info
        if (account?.provider !== 'credentials') {
          const db = await connectDb();
          const usersCollection = db.collection('users');

          // Check if user exists, otherwise create
          const existingUser = await usersCollection.findOne({
            email: user.email,
          });
          if (!existingUser) {
            const result = await usersCollection.insertOne({
              name: user.name,
              email: user.email,
              password: '',
              image: user.image,
              role: 'user',
              createdAt: new Date().toISOString(),
            });

            token.id = result.insertedId.toString();
            token.role = user.role || 'user';
          } else {
            token.id = existingUser._id.toString();
            token.role = existingUser.role;
          }
        } else {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
