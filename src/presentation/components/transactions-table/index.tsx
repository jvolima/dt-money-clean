import { type LoadTransactions } from '@/domain/usecases'
import { TransactionsContext } from '@/presentation/contexts'
import { TransactionItem } from './item'
import { TransactionsTableContainer } from './styles'
import React, { useContext } from 'react'
import { sortListByDate } from '@/presentation/utils'

export function TransactionsTable (): JSX.Element {
  const { state } = useContext(TransactionsContext)

  const sortedTransactions = sortListByDate(state.transactions)

  return (
    <TransactionsTableContainer>
      <table>
        <tbody data-testid="tbody">
          {sortedTransactions.map((transaction: LoadTransactions.Model) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </TransactionsTableContainer>
  )
}
