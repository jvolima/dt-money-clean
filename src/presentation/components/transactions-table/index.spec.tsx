import { TransactionsContext } from '@/presentation/contexts'
import { TransactionsTable } from '.'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { mockTransactionModel } from '@/domain/test'

describe('TransactionsTable component', () => {
  it('Should be able to sort and render correctly', () => {
    const transaction1 = mockTransactionModel()
    Object.assign(transaction1, {
      createdAt: new Date('2023-01-05')
    })

    const transaction2 = mockTransactionModel()
    Object.assign(transaction2, {
      createdAt: new Date('2023-01-03')
    })

    const transaction3 = mockTransactionModel()
    Object.assign(transaction3, {
      createdAt: new Date('2023-01-07')
    })

    const transactions = [transaction1, transaction2, transaction3]

    render(
      <TransactionsContext.Provider value={{ state: { transactions } }}>
        <TransactionsTable />
      </TransactionsContext.Provider>
    )
    const tbody = screen.getByTestId('tbody')
    const rows = tbody.querySelectorAll('tr')
    expect(rows).toHaveLength(transactions.length)

    const sortedTransactions = transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    rows.forEach((row, index) => {
      expect(row.getAttribute('data-testid')).toBe(`transaction-${sortedTransactions[index].id}`)
    })
  })
})
