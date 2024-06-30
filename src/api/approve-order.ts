import { api } from '@/lib/axios'

interface ApproveOrderParams {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  api.patch(`/orders/${orderId}/approve`)
}
