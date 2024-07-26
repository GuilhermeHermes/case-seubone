"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schemas/index"
import { Button } from "@/components/ui/button"
import {  startTransition, useState, useTransition } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import Image from 'next/image';



export const LoginForm = () => {
  const [isPending, setIsPending] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    startTransition(() => {
   login(data).then((response) => {
      setErrorMessage(response?.error)
      
    })
  })
  }

  return  (
    <div className="flex justify-center items-center">
  <div className="flex  bg-transparent shadow-lg">
    <div className="w-2/3 p-8">
    <Image src="/assets/illustration.png" alt="Coffee" width={400} height={300} />
    </div>
    <CardWrapper
      headerLabel="Welcome back"
      headerTitle="Login"
      backButtonlabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
      width="w-[800px]"
    >
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input {...field} placeholder="johndoe@example.com" type="email" disabled={isPending} />
                </FormControl>
                <FormMessage/>
                </FormItem>)
              }
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input {...field} placeholder="********" type="password" disabled={isPending} />
                </FormControl>
                 <FormMessage/>
                </FormItem>)
              }
            />
          </div>
          <FormError message={errorMessage || ''} />
          <Button variant='outline' type="submit" size="lg" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
       </Form>
    </CardWrapper>
      </div>
    </div>
  )
}
