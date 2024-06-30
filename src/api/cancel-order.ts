import { api } from '@/lib/axios'

interface CancelOrdersProps {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrdersProps) {
  api.patch(`/orders/${orderId}/cancel`)
}
