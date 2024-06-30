import { getStatus } from '@/utils/get-status'

interface OrderProps {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
}

const OrderStatus = ({ status }: OrderProps) => {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="size-2 rounded-full bg-slate-400"></span>
      )}

      {status === 'canceled' && (
        <span className="size-2 rounded-full bg-rose-500"></span>
      )}

      {status === 'delivering' && (
        <span className="size-2 rounded-full bg-emerald-500"></span>
      )}

      {['processing', 'delivering'].includes(status) && (
        <span className="size-2 rounded-full bg-amber-500"></span>
      )}
      <span className="font-medium text-muted-foreground">
        {getStatus(status)}
      </span>
    </div>
  )
}

export default OrderStatus
