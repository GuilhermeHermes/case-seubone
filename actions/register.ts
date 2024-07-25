'use server'
import { getUserByEmail } from '@/data/user'
import {prisma} from '@/lib/db'
import { RegisterSchema } from '@/schemas'
import { genSaltSync, hashSync } from 'bcrypt'

import * as z from 'zod'

interface RegisterData {
  email: string
  password: string
  name: string
}

export const register= async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' }
  }

  const {email, password, name} = validatedFields.data
  const hashedPassword = hashSync(password, genSaltSync(10))

  const existingUser = await getUserByEmail(email)
  
  if(existingUser){
    return { error: 'User already exists!' }
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return { success: 'User created!' }


}
  

