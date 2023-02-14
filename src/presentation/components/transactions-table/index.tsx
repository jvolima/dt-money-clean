import React, { useContext } from 'react'
import { type LoadTransactions } from '@/domain/usecases'
import { TransactionsContext } from '@/presentation/contexts'
import { TransactionItem } from './item'
import { TransactionsTableContainer } from './styles'

export function TransactionsTable (): JSX.Element {
  const { state } = useContext(TransactionsContext)

  return (
    <TransactionsTableContainer>
      <tbody data-testid="tbody">
        {state.transactions?.map((transaction: LoadTransactions.Model) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </TransactionsTableContainer>
  )
}
