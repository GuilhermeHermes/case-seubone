
import React, { useState } from 'react';
import SaleDetailsModal from './modal-info-vendas'; // Crie esse componente conforme necessário
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { changeSaleStatus } from '@/data/venda';
import {Venda} from './columns';

const CellActions = ({ payment }: { payment: Venda }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Venda | null>(null);

  const handleApprove = () => {
    changeSaleStatus(payment.id, 'completed');
    console.log(`Aprovado: ${payment.id}`);
  };

  const handleReject = () => {
    changeSaleStatus(payment.id, 'refused');
    console.log(`Reprovado: ${payment.id}`);
  };

  const handleViewDetails = () => {
    setSelectedSale(payment);
    setIsModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
            Copiar ID do pagamento
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleApprove}>
            Aprovar Solicitação
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReject}>
            Reprovar Solicitação
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewDetails}>
            Ver detalhes do pagamento
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SaleDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        venda={selectedSale}
      />
    </>
  );
};

export default CellActions;
