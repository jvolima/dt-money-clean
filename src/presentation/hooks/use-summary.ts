import { type LoadTransactions } from '@/domain/usecases'

export type SummaryModel = {
  income: number
  outcome: number
  total: number
}

export const useSummary = (transactions: LoadTransactions.Model[]): SummaryModel => {
  return transactions?.reduce(
    (acc: SummaryModel, transaction) => {
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
  ) || { income: 0, outcome: 0, total: 0 }
}
