'use client';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { checkNewPendingSales } from '@/data/venda'; // Importe a função do serviço
import { usePathname } from 'next/navigation';
import { SignOut } from './auth/logout-button';
import Image from 'next/image';

interface Props {
  role: string | undefined;
  name: string | undefined;
}

const logoPath = '/assets/LOGO.png';

export default function Header(props: Props) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const pathname = usePathname();
  const isAdmin = props.role === 'ADMIN';
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const checkForNewSales = async () => {
      const count = await checkNewPendingSales(lastChecked);
      if (count > 0) {
        setAlertVisible(true);
      }
    };

    checkForNewSales();

    const intervalId = setInterval(() => {
      console.log('Verificando novas vendas...');  
      checkForNewSales();
    }, 6000); // Verifica a cada 60 segundos

    return () => clearInterval(intervalId);
  }, [lastChecked]);

  const handleCloseAlert = () => {
    setAlertVisible(false);
    setLastChecked(new Date()); // Atualiza a última verificação para agora
  };

  return (
    <>
      <nav className="relative flex w-full flex-nowrap items-center justify-between bg-headerColor py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4" data-twe-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2">
            <a className="text-xl text-white dark:text-white" href="#">
              <Image src={logoPath} alt="logo" width={100} height={50} />
            </a>
          </div>
          <button className="block border-0 bg-transparent px-2 text-white/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" data-twe-collapse-init data-twe-target="#navbarSupportedContent3" aria-controls="navbarSupportedContent3" aria-expanded="false" aria-label="Toggle navigation">
            <span className="[&>svg]:w-7 [&>svg]:stroke-white/50 dark:[&>svg]:stroke-neutral-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          <div className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto" id="navbarSupportedContent3" data-twe-collapse-item>
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row" data-twe-navbar-nav-ref>
              <li className={`ml-6 mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0 ${isActive('/vendas') ? 'font-bold' : ''}`} data-twe-nav-item-ref>
                <a className="p-0 text-white transition duration-200 hover:text-[#fabb18] hover:underline hover:ease-in-out focus:text-[#fabb18] active:text-[#fabb18] motion-reduce:transition-none dark:text-white dark:hover:text-[#fabb18] dark:focus:text-[#fabb18] dark:active:text-[#fabb18] lg:px-2" href="/vendas" data-twe-nav-link-ref>
                  Vendas
                </a>
              </li>
              {isAdmin && <li className={`mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0 ${isActive('/request') ? 'font-bold' : ''}`} data-twe-nav-item-ref>
                <a className="p-0 text-white transition duration-200 hover:text-[#fabb18] hover:underline hover:ease-in-out focus:text-[#fabb18] active:text-[#fabb18] motion-reduce:transition-none dark:text-white dark:hover:text-[#fabb18] dark:focus:text-[#fabb18] dark:active:text-[#fabb18] lg:px-2" href="/request" data-twe-nav-link-ref>
                  Solicitações
                </a>
              </li>}
              {isAdmin && <li className={`mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0 ${isActive('/users') ? 'font-bold' : ''}`} data-twe-nav-item-ref>
                <a className="p-0 text-white transition duration-200 hover:text-[#fabb18] hover:underline hover:ease-in-out focus:text-[#fabb18] active:text-[#fabb18] motion-reduce:transition-none dark:text-white dark:hover:text-[#fabb18] dark:focus:text-[#fabb18] dark:active:text-[#fabb18] lg:px-2" href="/users" data-twe-nav-link-ref>
                  Vendedores
                </a>
              </li>}
              <li className={`mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0 ${isActive('/perfil') ? 'font-bold' : ''}`} data-twe-nav-item-ref>
                <a className="p-0 text-white transition duration-200 hover:text-[#fabb18] hover:underline hover:ease-in-out focus:text-[#fabb18] active:text-[#fabb18] motion-reduce:transition-none dark:text-white dark:hover:text-[#fabb18] dark:focus:text-[#fabb18] dark:active:text-[#fabb18] lg:px-2" href="/perfil" data-twe-nav-link-ref>
                  Perfil
                </a>
              </li>
            </ul>
            <a className="p-0 text-white transition duration-200 lg:px-2" href="/perfil" data-twe-nav-link-ref>
              {props.name}
            </a>
            <SignOut />
          </div>
        </div>
      </nav>
      {alertVisible && (
        <Alert variant="destructive">
          <p>Uma nova venda pendente foi cadastrada. Verifique o sistema para mais detalhes.</p>
        </Alert>
      )}
    </>
  );
}
