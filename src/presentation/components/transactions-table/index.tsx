import React, { useContext } from 'react'
import { type LoadTransactions } from '@/domain/usecases'
import { TransactionsContext } from '@/presentation/contexts'
import { TransactionItem } from './item'
import { TransactionsTableContainer } from './styles'

export function TransactionsTable (): JSX.Element {
  const { state } = useContext(TransactionsContext)

  const sortedTransactions = state.transactions?.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <TransactionsTableContainer>
      <tbody data-testid="tbody">
        {sortedTransactions.map((transaction: LoadTransactions.Model) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </TransactionsTableContainer>
  )
}
