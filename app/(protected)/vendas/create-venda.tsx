"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdAttachMoney } from "react-icons/md";
import Modal from './modal-create-vendas';

interface Props {
  idSeller: string;
}

const CreateVendas = ({ idSeller }: Props) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get('modal') === 'true';

  const handleOpenModal = () => {
    router.push('/vendas?modal=true');
  };

  const handleCloseModal = () => {
    router.push('/vendas');
  };

  return (
    <>
      <button
        className=" bg-headerColor text-white rounded-md text-sm flex items-center mb-4 ml-2 p-2"
        onClick={handleOpenModal}
      >
        <MdAttachMoney />
        Adicionar venda
      </button>
      <Modal idSeller={idSeller} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CreateVendas;
