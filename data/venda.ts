// vendaActions.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criação de uma Venda
export async function createVenda(data: {
  price: number;
  frete: number;
  totalAmount: number;
  saleDate: Date;
  status: string;
  sellerId: string;
  buyer: string;
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
    },
  });
  return venda;
}

// Leitura de uma Venda com Produtos
export async function getVendaWithProdutos(vendaId: string) {
  const venda = await prisma.venda.findUnique({
    where: { id: vendaId },
    include: {
      products: {
        include: {
          produto: true, // Inclui detalhes do produto
        },
      },
    },
  });
  return venda;
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
