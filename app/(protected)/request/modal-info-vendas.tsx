import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Venda, formatDateTime, getStatusProps} from './columns'

interface VendaDetailsModalProps {
  open: boolean
  onClose: () => void
  venda: Venda | null
}


const SalesDetailsModal: React.FC<VendaDetailsModalProps> = ({ open, onClose, venda }) => {
  if (!venda) return null

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalhes da Venda</DialogTitle>
      <DialogContent>
        <div>
          <strong>ID:</strong> {venda.id}
        </div>
        <div>
          <strong>Comprador:</strong> {venda.buyer}
        </div>
        <div>
          <strong>Status:</strong> {getStatusProps(venda.status).text}
        </div>
        <div>
          <strong>Vendedor:</strong> {getStatusProps(venda.sellerName ?? '').text}
        </div>
        <div>
          <strong>ID do Vendedor:</strong> {venda.sellerId}
        </div>
        <div>
          <strong>Data:</strong> {formatDateTime(venda.saleDate)}
        </div>
        <div>
          <strong>Valor Total:</strong>R$ {venda.totalAmount.toFixed(2).replace('.', ',')}
        </div>
        <div>
          <strong>Desconto:</strong> {venda.discount}%
        </div>
        <div>
          <strong>Desconto Máximo:</strong>R$ {venda.maxDiscount}
        </div>
        <div>
          <strong>Frete:</strong>R$ {venda.frete}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SalesDetailsModal
