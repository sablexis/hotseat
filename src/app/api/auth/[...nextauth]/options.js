import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
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
                };
            },
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,

        }),

        GoogleProvider({
            profile(profile){
                console.log("Google Profile: ", profile);

                return{
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientID: process.env.GOOGLE_ID,
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
};