import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { login } from "@/utils/api";

interface ExtendedJWT extends JWT {
    accessToken?: string;
}

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }

    interface User {
        token?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials;
                const user = await login({ email, password });

                if (user) {
                    return {
                        id: String(user.token),
                        email,
                        token: user.token,
                    };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            const extendedToken = token as ExtendedJWT;
            if (user?.token) {
                extendedToken.accessToken = user.token;
            }
            return extendedToken;
        },
        async session({ session, token }) {
            const extendedToken = token as ExtendedJWT;
            session.accessToken = extendedToken.accessToken;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
