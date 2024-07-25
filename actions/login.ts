"use server"

import * as z from 'zod'

import { loginSchema } from '@/schemas'
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login  = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);

    if(!validatedFields.success){
      return { error: 'Invalid Fields!' }
    }

    const {email, password} = validatedFields.data
    try {
      await signIn('credentials', {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
      
    } catch (e) {
      if(e instanceof AuthError){
        switch (e.type){
          case "CredentialsSignin": return {error: "Invalid Credentials"}
          default: return {error: "An error occurred"}
        }
      }
      throw e
    }
}
