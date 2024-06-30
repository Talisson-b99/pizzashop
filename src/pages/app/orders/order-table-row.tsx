import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import { getOrdersRespose } from '@/api/get-orders'
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<getOrdersRespose>({
        queryKey: ['orders'],
      })

      ordersListCache.forEach(([cachekey, cacheData]) => {
        if (!cacheData) return

        queryClient.setQueryData<getOrdersRespose>(cachekey, {
          ...cacheData,
          orders: cacheData.orders.map((item) => {
            if (item.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }
            return item
          }),
        })
      })
    },
  })

  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
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
            <Button
              variant="ghost"
              size="sm"
              disabled={!['pending', 'processing'].includes(order.status)}
              className="disabled:cursor-not-allowed"
              onClick={() => mutateAsync({ orderId })}
            >
              <X className="mr-2 size-3" />
              cancelar
            </Button>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <OrderDetails orderId={orderId} open={isDetailsOpen} />
    </Dialog>
  )
}

export default OrderTableRow
