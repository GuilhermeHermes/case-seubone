// vendaProdutoActions.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Associação de Produtos a uma Venda
export async function addProdutosToVenda(vendaId: string, produtos: { produtoId: number; quantidade: number; precoUnitario: number; }[]) {
  //TODO: verificar se o produto existe
  const promises = produtos.map(produto =>
    prisma.vendaProduto.create({
      data: {
        vendaId: vendaId,
        produtoId: produto.produtoId,
        quantidade: produto.quantidade,
        precoUnitario: produto.precoUnitario,
      },
    })
  );
  const result = await Promise.all(promises);
  return result;
}

// Exclusão de Produtos de uma Venda
export async function removeProdutoFromVenda(vendaId: string, produtoId: number) {
  const vendaProduto = await prisma.vendaProduto.delete({
    where: {
      vendaId_produtoId: {
        vendaId: vendaId,
        produtoId: produtoId,
      },
    },
  });
  return vendaProduto;
}

// Leitura de Produtos Associados a uma Venda
export async function getProdutosFromVenda(vendaId: string) {
  const produtos = await prisma.vendaProduto.findMany({
    where: { vendaId: vendaId },
    include: {
      produto: true, // Inclui detalhes do produto
    },
  });
  return produtos;
}
