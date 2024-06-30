import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { getOrdersRespose } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/format-currency'

import OrderDetails from './order-details'
import OrderStatus, { OrderProps } from './order-status'

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

  function updateOrderStatusOnChange(orderId: string, { status }: OrderProps) {
    const ordersListCache = queryClient.getQueriesData<getOrdersRespose>({
      queryKey: ['orders'],
    })

    console.log(ordersListCache)

    ordersListCache.forEach(([cachekey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<getOrdersRespose>(cachekey, {
        ...cacheData,
        orders: cacheData.orders.map((item) => {
          if (item.orderId === orderId) {
            return { ...order, status }
          }
          return item
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isPendingCancel } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnChange(orderId, { status: 'canceled' })
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isPendingApprove } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnChange(orderId, { status: 'processing' })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isPendingDispatch } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnChange(orderId, { status: 'delivering' })
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isPendingDeliver } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnChange(orderId, { status: 'delivered' })
      },
    })

  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <TableRow>
        <TableCell>
          <DialogTrigger asChild>
            <Button variant="outline" className="size-8 px-2.5">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
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
          {order.status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                approveOrderFn({ orderId: order.orderId }) || isPendingApprove
              }
            >
              <ArrowRight className="mr-2 size-3" />
              Aprovar
            </Button>
          )}

          {order.status === 'processing' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                dispatchOrderFn({ orderId: order.orderId }) || isPendingDispatch
              }
            >
              <ArrowRight className="mr-2 size-3" />
              Em entrega
            </Button>
          )}

          {order.status === 'delivering' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                deliverOrderFn({ orderId: order.orderId }) || isPendingDeliver
              }
            >
              <ArrowRight className="mr-2 size-3" />
              Entregue
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            disabled={
              !['pending', 'processing'].includes(order.status) ||
              isPendingCancel
            }
            className="disabled:cursor-not-allowed"
            onClick={() => cancelOrderFn({ orderId })}
          >
            <X className="mr-2 size-3" />
            cancelar
          </Button>
        </TableCell>
      </TableRow>

      <OrderDetails orderId={orderId} open={isDetailsOpen} />
    </Dialog>
  )
}

export default OrderTableRow
