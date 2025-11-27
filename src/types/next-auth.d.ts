import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: string;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}
