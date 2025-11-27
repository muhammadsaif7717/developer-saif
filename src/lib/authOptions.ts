import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        firstName: { label: 'First Name', type: 'text' },
        lastName: { label: 'Last Name', type: 'text' },
        image: { label: 'Image', type: 'text' },
        role: { label: 'Role', type: 'text' },
        isSignUp: { label: 'Is Sign Up', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await connectDb();
        const usersCollection = db.collection('users');

        const isSignUp = credentials.isSignUp === 'true';

        if (isSignUp) {
          const existingUser = await usersCollection.findOne({
            email: credentials.email,
          });
          if (existingUser) {
            throw new Error('User already exists');
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const fullName = `${credentials.firstName} ${credentials.lastName}`;

          const result = await usersCollection.insertOne({
            name: fullName,
            email: credentials.email,
            password: hashedPassword,
            image: credentials.image,
            role: credentials.role,
            createdAt: new Date().toISOString(),
          });

          return {
            id: result.insertedId.toString(),
            email: credentials.email,
            role: credentials.role,
            name: fullName,
            image: credentials.image,
          };
        } else {
          const user = await usersCollection.findOne({
            email: credentials.email,
          });
          if (!user || !user.password) {
            throw new Error('User not found or missing password');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user._id.toString(),
            role: user.role,
            email: user.email,
            name: user.name,
            image: user.image || null,
          };
        }
      },
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
