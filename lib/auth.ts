import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from './mongodb';
import UserModel from '@/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await (UserModel as any).findOne({ email: credentials.email }).lean();
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) return null;

        return {
          id: (user._id as string).toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          freelancerProfileId: user.freelancerProfileId,
          clientProfileId: user.clientProfileId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.avatar = (user as any).avatar;
        token.freelancerProfileId = (user as any).freelancerProfileId;
        token.clientProfileId = (user as any).clientProfileId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).avatar = token.avatar;
        (session.user as any).freelancerProfileId = token.freelancerProfileId;
        (session.user as any).clientProfileId = token.clientProfileId;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
});
