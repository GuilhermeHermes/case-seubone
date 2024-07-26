'use server'
import { prisma } from '@/lib/db'


export const getUserByEmail = async (email: string) => {
   try{ 
    const user = await prisma.user.findUnique({where: {email} });
    return user;
}catch{
    return null
}
    }


export const getUserById = async (id: string) => {
    try{ 
         const user = await prisma.user.findUnique({where: {id} });
         return user;
     }catch{
         return null
     }
         }

export const getAllVendedores = async () => {
    try{ 
    const user = await prisma.user.findMany({where: {role: "USER"} });
    return user;
     
 }catch(e){
    console.log(e)
     return null
 }
     }

export const deleteUser = async (id: string) => {
    try{ 
    const user = await prisma.user.delete({where: {id} });
    return user;
     
 }catch(e){
    console.log(e)
     return null
 }
     }


export const getUserRole = async (id: string) => {
    try{ 
    const user = await prisma.user.findUnique({where: {id} });
    return user?.role;
     
 }catch(e){
    console.log(e)
     return null
 }
     }