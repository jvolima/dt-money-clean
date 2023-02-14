import React from 'react'
import { type LoadTransactions } from '@/domain/usecases'
import { TransactionItemContainer, PriceHighlight } from './styles'

type Props = {
  transaction: LoadTransactions.Model
}

export function TransactionItem ({ transaction }: Props): JSX.Element {
  return (
    <TransactionItemContainer key={transaction.id}>
      <td data-testid="description" width="50%">{transaction.description}</td>
      <td>
        <PriceHighlight data-testid="price" data-type={transaction.type} variant={transaction.type}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(transaction.price)}
        </PriceHighlight>
      </td>
      <td data-testid="category">{transaction.category}</td>
      <td data-testid="created-at">{new Intl.DateTimeFormat('pt-BR').format(transaction.createdAt)}</td>
    </TransactionItemContainer>
  )
}
