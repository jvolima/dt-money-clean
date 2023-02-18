import { type LoadTransactions } from '@/domain/usecases'
import { dateFormatter, priceFormatter } from '@/presentation/utils'
import { TransactionItemContainer, PriceHighlight } from './styles'
import React from 'react'

type Props = {
  transaction: LoadTransactions.Model
}

export function TransactionItem ({ transaction }: Props): JSX.Element {
  return (
    <TransactionItemContainer data-testid={`transaction-${transaction.id}`} key={transaction.id}>
      <td data-testid="description" width="50%">{transaction.description}</td>
      <td>
        <PriceHighlight data-testid="price" data-type={transaction.type} variant={transaction.type}>
          {transaction.type === 'outcome' && '- '}
          {priceFormatter(transaction.price)}
        </PriceHighlight>
      </td>
      <td data-testid="category">{transaction.category}</td>
      <td data-testid="created-at">{dateFormatter(transaction.createdAt)}</td>
    </TransactionItemContainer>
  )
}
