export function formatCurrency(price: number) {
  const currency = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)

  return currency
}
