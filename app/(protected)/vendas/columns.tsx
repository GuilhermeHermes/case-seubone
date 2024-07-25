"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Venda = {
  id: string
  seller: string
  amount: number
  status: "Pendente" | "Confirmado" | "Recusado"
  cliente: string
}

export const columns: ColumnDef<Venda>[] = [
     {
    accessorKey: "seller",
    header: "Vendedor",
  },
    {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = (row.getValue("status"))
        switch (status) {
            case "Pendente":
                return <div className="text-yellow-500">Pendente</div>
            case "Confirmado":
                return <div className="text-green-500">Confirmado</div>
            case "Recusado":
                return <div className="text-red-500">Recusado</div>
        
        }
    }
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => {
        const cliente = row.original.cliente;
        const maxLength = 20; // Defina o limite de caracteres desejado
        return cliente.length > maxLength ? cliente.slice(0, maxLength) + '...' : cliente;
      }
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => {
      const venda = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(venda.id)}
            >
              Copiar ID da venda
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Visualizar detalhes da venda</DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
