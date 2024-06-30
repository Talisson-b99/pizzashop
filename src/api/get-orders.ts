import { api } from '@/lib/axios'

interface getOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface getOrdersRespose {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: getOrdersQuery) {
  const response = await api.get<getOrdersRespose>('/orders', {
    params: {
      pageIndex,
      status,
      customerName,
      orderId,
    },
  })

  return response.data
}
