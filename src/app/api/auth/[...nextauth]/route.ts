// import NextAuth from "next-auth"
// import { authOptions } from "@/lib/auth"
//
// const handler = NextAuth(authOptions)
//
// export { handler as GET, handler as POST }



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const response = await fetch("https://iptsp.cosmocom.net:8001/AUTHENTICATION/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                    });

                    const user = await response.json();

                    if (response.ok && user) {
                        return user;
                    }
                    return null;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user = token.user;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };