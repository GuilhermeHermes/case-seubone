// components/Modal.tsx
"use client";

import React, { useState } from 'react';
import SaleCreateCard from '@/components/card-vendas';// Certifique-se de ajustar o caminho se necessário

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-50">
    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
    <div className="relative bg-white p-2 rounded-lg shadow-lg w-full max-w-lg z-50">
      <SaleCreateCard />
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
        ×
      </button>
    </div>
  </div>
  );
};

export default Modal;
