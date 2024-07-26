'use server'
import { prisma } from '@/lib/db'



// Criação de um Produto
export async function createProduto(data: {
  SKU: string;
  produto: string;
  preco_cheio: number;
  preco_descontado: number;
}) {
  const produto = await prisma.produto.create({
    data: {
      SKU: data.SKU,
      produto: data.produto,
      preco_cheio: data.preco_cheio,
      preco_descontado: data.preco_descontado,
    },
  });
  return produto;
}

// Leitura de um Produto
export async function getProdutoById(produtoId: string) {
  const produto = await prisma.produto.findUnique({
    where: { id: produtoId.toString() },
  });
  return produto;
}

export async function getProdutoBySku(produtoSKU: string) {
  const produto = await prisma.produto.findUnique({
    where: { SKU: produtoSKU },
  });
  return produto;
}

// Atualização de um Produto
export async function updateProduto(produtoId: string, updates: Partial<{
  SKU: string;
  produto: string;
  preco_cheio: number;
  preco_descontado: number;
}>) {
  const produto = await prisma.produto.update({
    where: { id: produtoId },
    data: updates,
  });
  return produto;
}

// Exclusão de um Produto
export async function deleteProduto(produtoId: string) {
  const produto = await prisma.produto.delete({
    where: { id: produtoId },
  });
  return produto;
}
