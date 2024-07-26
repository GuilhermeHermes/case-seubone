import { RedirectButton } from '@/components/auth/redirect-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import './globals.css'
import Image from "next/image"; 

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className='flex h-full flex-col w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-headerColor to-blue-800'>
      <div className='space-y-6 text-center gap-11'>
        <Image src={'/assets/LOGO.png'} width={400} height={100} alt={'LOGO'}/>
        <p className='text-white text-lg'>Sistema de vendas</p>
        <div>
          <RedirectButton route="/auth/login">
            <Button variant='secondary'>Login</Button>
          </RedirectButton>
          <RedirectButton route="/auth/register">
            <Button variant='secondary'>Registrar</Button>
          </RedirectButton>
        </div>
      </div>
    </main>
  );
}
