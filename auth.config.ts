import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = await loginSchema.safeParse(credentials)
                
                if(validatedFields.success){
                   const {email, password} = validatedFields.data

                   const user = await getUserByEmail(email)
                   if(!user || !user.password) return null;
                    const pwdMatch = await bcrypt.compare(password, user.password) 
                    if(pwdMatch){
                        return user
                    }
                  }
                return null
            
            }
        })

    ]
} satisfies NextAuthConfig