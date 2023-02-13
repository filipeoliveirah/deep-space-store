/**
 * Format to Brazilian Decimal Pattern
 * @param { number } value
 */
export const formatCurrency = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})