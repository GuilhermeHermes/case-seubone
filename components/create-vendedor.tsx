// components/ClientSideComponent.tsx
"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoMdPersonAdd } from "react-icons/io";
import Modal from '@/components/auth/modal';

const ClientSideComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get('modal') === 'true';

  const handleOpenModal = () => {
    router.push('/users?modal=true');
  };

  const handleCloseModal = () => {
    router.push('/users');
  };

  return (
    <>
      <button
        className="p-2 bg-blue-500 text-white rounded-md text-sm flex items-center gap-2"
        onClick={handleOpenModal}
      >
        <IoMdPersonAdd />
        Adicionar vendedor
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ClientSideComponent;
