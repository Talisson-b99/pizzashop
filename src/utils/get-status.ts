export function getStatus(status: string) {
  switch (status) {
    case 'pending':
      return 'Pendente'
    case 'canceled':
      return 'Cancelado'
    case 'processing':
      return 'Processando'
    case 'delivering':
      return 'A caminho'
    case 'delivered':
      return 'Entregue'
    default:
      return 'erro'
  }
}
