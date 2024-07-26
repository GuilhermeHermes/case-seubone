'use server'
import { prisma } from '@/lib/db';
import { getProdutoBySku } from './produto';



// Associação de Produtos a uma Venda
export async function adicionarProdutoAVenda(vendaId: string, produto: {SKU: string, quantidade: number, precoUnitario: number, produtoId: string}) {
  // Encontra a venda existente
  const venda = await prisma.venda.findUnique({ where: { id: vendaId } });

  // Verifica se a venda existe
  if (!venda) {
    throw new Error('Venda não encontrada');
  }

  
  const novoProdutoVenda = await prisma.vendaProduto.create({
    data: {
      vendaId,
      produtoId: produto.produtoId, // Add the produtoId property here
      produtoSKU: produto.SKU,
      quantidade: produto.quantidade,
      precoUnitario: produto.precoUnitario,
    },
  });

  // Atualiza o valor total da venda (se necessário)
  // ... (código similar ao anterior)

  return novoProdutoVenda;
}

// Exclusão de Produtos de uma Venda
export async function removeProdutoFromVenda(vendaId: string, produtoId: string) {
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
