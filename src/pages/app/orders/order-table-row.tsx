import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/format-currency'

import OrderDetails from './order-details'
import OrderStatus from './order-status'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const { createdAt, customerName, orderId, status, total } = order

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow>
          <TableCell>
            <Button variant="outline" className="size-8 px-2.5">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </TableCell>
          <TableCell className="font-mono text-xs font-medium">
            {orderId}
          </TableCell>
          <TableCell className="text-muted-foreground">
            {formatDistanceToNow(createdAt, {
              locale: ptBR,
              addSuffix: true,
            })}
          </TableCell>
          <TableCell>
            <OrderStatus status={status} />
          </TableCell>
          <TableCell className="font-medium">{customerName}</TableCell>
          <TableCell className="font-medium">{formatCurrency(total)}</TableCell>
          <TableCell>
            <Button variant="outline" size="sm">
              <ArrowRight className="mr-2 size-3" />
              Aprovar
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm">
              <X className="mr-2 size-3" />
              cancelar
            </Button>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <OrderDetails />
    </Dialog>
  )
}

export default OrderTableRow
