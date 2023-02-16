import { SummaryContainer, SummaryCard } from './styles'
import { TransactionsContext } from '@/presentation/contexts'
import { type LoadTransactions } from '@/domain/usecases'
import { priceFormatter } from '@/presentation/utils'
import React, { useContext } from 'react'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

type Acc = {
  income: number
  outcome: number
  total: number
}

export function Summary (): JSX.Element {
  const { state } = useContext(TransactionsContext)

  const summary: Acc = state.transactions?.reduce(
    (acc: Acc, transaction: LoadTransactions.Model) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0
    }
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong data-testid="incomes">{priceFormatter(summary?.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong data-testid="outcomes">{priceFormatter(summary?.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong data-testid="total">{priceFormatter(summary?.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
