import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next";

export const options = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "email", type: "text", placeholder: "jsmith@email.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)
              const res = await fetch("/api/auth/register", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
        
              // If no error and we have user data, return it
              if (res.ok && user) {
                return user
              }
              // Return null if user data could not be retrieved
              return null
            }
          }),

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

    ],
    callbacks:{
        async jwt({token, user}){
            if (user) token.role = user.role;
            return token;
        },

        async session({session, token}){
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
}

export default NextAuth(options)