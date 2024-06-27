import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import OrderDetails from './order-details'

const OrderTableRow = () => {
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
            jdaklçfcjakl
          </TableCell>
          <TableCell className="text-muted-foreground">
            {' '}
            há 15 minutos
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-slate-400"></span>
              <span className="font-medium text-muted-foreground">
                Pendente
              </span>
            </div>
          </TableCell>
          <TableCell className="font-medium">Talisson barbosa</TableCell>
          <TableCell className="font-medium">R$ 149,90</TableCell>
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
