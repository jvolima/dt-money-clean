import { SummaryContainer, SummaryCard } from './styles'
import { TransactionsContext } from '@/presentation/contexts'
import { priceFormatter } from '@/presentation/utils'
import { type SummaryModel, useSummary } from '@/presentation/hooks'
import React, { useContext, useEffect, useState } from 'react'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

export function Summary (): JSX.Element {
  const { state } = useContext(TransactionsContext)
  const [summary, setSummary] = useState<SummaryModel>({} as SummaryModel)

  useEffect(() => {
    setSummary(useSummary(state.transactions))
  }, [state.transactions])

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong data-testid="incomes">{priceFormatter(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong data-testid="outcomes">{priceFormatter(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong data-testid="total">{priceFormatter(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
