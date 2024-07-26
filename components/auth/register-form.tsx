"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"	
import { useForm} from "react-hook-form"
import { z } from "zod"
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {RegisterSchema} from "@/schemas/index"
import { Button } from "@/components/ui/button"
import {FormError} from "@/components/form-error"
import {FormSuccess} from "@/components/form-success"
import {register} from "@/actions/register";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import Image from 'next/image';


export const RegisterForm = () => {
  const [isPending, setIsPending] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const [successMessage, setSuccessMessage] = useState<string | undefined>('')
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(data).then((response) => {
         setErrorMessage(response.error)
         setSuccessMessage(response.success)
       })
     })
     }
     
  

  return (
    <div className="flex justify-center items-center">
  <div className="flex  bg-transparent shadow-lg">
    <div className="w-2/3 p-8">
    <Image src="/assets/illustration.png" alt="Coffee" width={400} height={300} />
    </div>
    <CardWrapper
    headerTitle="Register"
    headerLabel="Welcome back"
    backButtonlabel="Already have an account?"
    backButtonHref="/auth/login"
    showSocial
    width="w-[500px]"
  >
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6">
        <div className="space-y-4">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
              <Input {...field} placeholder="John Doe" type="text" disabled={isPending} />
              </FormControl>
              <FormMessage/>
              </FormItem>)
            }
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
              <Input {...field} placeholder="johndoe@exampel.com" type="email" disabled={isPending} />
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
        <FormSuccess message={successMessage || ''} />
        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          Create an account
        </Button>
      </form>
     </Form>
  </CardWrapper>
  </div>
  </div>
  );
}

