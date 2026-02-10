import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";

export const options = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [

        GitHubProvider({
            profile(profile){
                console.log("GitHub Profile: ", profile);

                let userRole = "GitHub User";
                if (profile?.email == "mail@hellosab.com"){
                    userRole = "admin";
                }

                return{
                    ...profile,
                    role: userRole,
                    id: profile.id.toString(),
                };
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,

        }),

        GoogleProvider({
            profile(profile){
                console.log("Google Profile: ", profile);

                let userRole = "Google User";
                return{
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

        DiscordProvider({
            profile(profile){
                console.log("Discord Profile: ", profile);

                let userRole = "Discord User";
                return{
                    ...profile,
                    id: profile.id,
                    role: userRole,
                };
            },
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: {
                label: "email:",
                type: "text",
                placeholder: "your-email-or-username",
              },
              password: {
                label: "password:",
                type: "password",
                placeholder: "your-password",
              },
            },
            async authorize(credentials) {
              try {
                // Try to find user by email first, then by name (username)
                const foundUser = await User.findOne({
                  $or: [
                    { email: credentials.email },
                    { name: credentials.email }
                  ]
                })
                  .lean()
                  .exec();
      
                if (foundUser) {
                  console.log("User Exists");
                  const match = await bcrypt.compare(
                    credentials.password,
                    foundUser.password
                  );
      
                  if (match) {
                    console.log("Good Pass");
                    delete foundUser.password;
      
                    foundUser["role"] = "Unverified Email";
                    return foundUser;
                  }
                }
              } catch (error) {
                console.log(error);
              }
              return null;
            },
          }),
        ],
        callbacks: {
          async jwt({ token, user }) {
            if (user) {
              token.role = user.role;
              token.id = user._id || user.id;
            }
            return token;
          },
          async session({ session, token }) {
            if (session?.user) {
              session.user.role = token.role;
              session.user.id = token.id;
            }
            return session;
          },
        },
      };