'use server'

// vendaActions.ts
import { prisma } from '@/lib/db';
import {Venda} from '@/app/(protected)/vendas/columns'


// Criação de uma Venda
export async function createVenda(data: {
  price: number;
  frete: number;
  totalAmount: number;
  saleDate: Date;
  status: string;
  sellerId: string;
  buyer: string;
  discount: number;
  maxDiscount: number;
}) {
  const venda = await prisma.venda.create({
    
    data: {
      price: data.price,
      frete: data.frete,
      totalAmount: data.totalAmount,
      saleDate: data.saleDate,
      status: data.status,
      sellerId: data.sellerId,
      buyer: data.buyer,
      discount: data.discount,
      maxDiscount: data.maxDiscount
    },
  });
  return venda;
}



export const getVendasByUser = async (userId: string) => {  
  try{ 
  const vendas = await prisma.venda.findMany({where: {sellerId: userId} });
  return vendas;
   
}catch(e){
  console.log(e)
   return null
}
}



export async function getAllVendas() {
  const vendas = await prisma.venda.findMany();
  return vendas;
}

export async function getAllVendasPendentes(){
  const vendas = await prisma.venda.findMany({where: {status: 'pending'}});
  return vendas;
}

// Atualização de uma Venda
export async function updateVenda(vendaId: string, updates: Partial<{
  price: number;
  frete: number;
  totalAmount: number;
  saleDate: Date;
  status: string;
  buyer: string;
}>) {
  const venda = await prisma.venda.update({
    where: { id: vendaId },
    data: updates,
  });
  return venda;
}

// Exclusão de uma Venda
export async function deleteVenda(vendaId: string) {
  // Opcional: Primeiro exclua todos os registros na tabela intermediária
  await prisma.vendaProduto.deleteMany({
    where: { vendaId: vendaId },
  });

  // Exclua a venda
  const venda = await prisma.venda.delete({
    where: { id: vendaId },
  });
  return venda;
}

export async function getPendingVendasCount(){
  const vendas = await prisma.venda.count({where: {status: 'pending'}});
  return vendas;
}

// src/services/salesService.ts


export async function checkNewPendingSales(lastChecked: Date): Promise<number> {
  const count = await prisma.venda.count({
    where: {
      status: 'Pendente',
      saleDate: {
        gt: lastChecked,
      },
    },
  });
  return count;
}

export async function changeSaleStatus(vendaId: string, status: string) {
  const venda = await prisma.venda.update({
    where: { id: vendaId },
    data: { status },
  });
  return venda;
}