import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const adminResponse = await fetch(
          "http://localhost:3000/api/auth/getAdmin?username=" + username
        );
        const admin = await adminResponse.json();

        if (!admin) {
          throw new Error("Admin not found!");
        }

        if (password !== admin.password) {
          throw new Error("Invalid Admin Credentials!");
        }
        return {
          id: admin._id,
          role: admin.role,
          username: admin.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
