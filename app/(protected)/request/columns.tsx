'use client'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React from "react"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { changeSaleStatus } from "@/data/venda"
import CellActions from "./cellactions"


export type Venda = {
  id: string,
  totalAmount: number,
  status: string,
  buyer: string,
  saleDate: Date
  sellerId?: string
  sellerName?: string
  discount?: number
  maxDiscount?: number
  frete?: number
}

// Função para formatar a data e hora
export const formatDateTime = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Data inválida"
  }
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: 'short',   // Formato curto para a data
    timeStyle: 'short',   // Formato curto para a hora
  }).format(date)
}

export const getStatusProps = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return { text: 'Pendente', color: 'text-yellow-500' }
    case 'completed':
      return { text: 'Completo', color: 'text-green-500' }
    case 'refused':
      return { text: 'Recusado', color: 'text-red-500' }
    default:
      return { text: status, color: '' }
  }
}

export const columns: ColumnDef<Venda>[] = [
  {
    id: 'buyer',
    header: () => <div className="text-center font-semibold text-gray-700">Comprador</div>,
    cell: ({ row }) => <div className="text-center">{row.original.buyer}</div>,
    accessorKey: 'buyer',
  },
  {
    id: 'saleDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },    cell: ({ row }) => {
      const date = row.original.saleDate
      return <div className="text-center">{formatDateTime(new Date(date))}</div>
    },
    accessorKey: 'saleDate',
  },
  {
    id: 'totalAmount',
    header: () => <div className="text-center font-semibold text-gray-700">Valor Total</div>,
    cell: ({ row }) => <div className="text-center">{row.original.totalAmount.toFixed(2).replace('.', ',')}</div>,
    accessorKey: 'totalAmount',
  },
  {
    id: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { text, color } = getStatusProps(row.original.status)
      return <div className={`text-center ${color}`}>{text}</div>
    },
    accessorKey: 'status',
  },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const payment = row.original;
        return <CellActions payment={payment} />;
      },
    },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Venda, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'saleDate',
      desc: true,
    },

  ])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-6">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
