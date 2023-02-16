import { TransactionsContext } from '@/presentation/contexts'
import { render, screen } from '@testing-library/react'
import { Summary } from '.'
import React from 'react'
import { mockTransactionListModel, mockTransactionModel } from '@/domain/test'

const makeSut = (transactions = mockTransactionListModel()): void => {
  render(
    <TransactionsContext.Provider value={{ state: { transactions } }}>
      <Summary />
    </TransactionsContext.Provider>
  )
}

describe('Summary component', () => {
  it('Should be able to load with correct state', () => {
    const transaction1 = mockTransactionModel()
    Object.assign(transaction1, {
      price: 2000,
      type: 'income'
    })
    const transaction2 = mockTransactionModel()
    Object.assign(transaction2, {
      price: 500,
      type: 'outcome'
    })
    const transactions = [transaction1, transaction2]
    makeSut(transactions)
    const incomes = screen.getByTestId('incomes')
    const outcomes = screen.getByTestId('outcomes')
    const total = screen.getByTestId('total')
    expect(incomes).toHaveTextContent('R$ 2.000,00')
    expect(outcomes).toHaveTextContent('R$ 500,00')
    expect(total).toHaveTextContent('R$ 1.500,00')
  })

  it('Should be able to render correctly when empty list is passed to summary', () => {
    const transactions = []
    makeSut(transactions)
    const incomes = screen.getByTestId('incomes')
    const outcomes = screen.getByTestId('outcomes')
    const total = screen.getByTestId('total')
    expect(incomes).toHaveTextContent('R$ 0,00')
    expect(outcomes).toHaveTextContent('R$ 0,00')
    expect(total).toHaveTextContent('R$ 0,00')
  })
})
