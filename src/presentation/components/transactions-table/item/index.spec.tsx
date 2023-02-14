import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockTransactionModel } from '@/domain/test'
import { type LoadTransactions } from '@/domain/usecases'
import { TransactionItem } from '.'

const makeSut = (transaction: LoadTransactions.Model): void => {
  render(
    <table>
      <tbody>
        <TransactionItem transaction={transaction} />
      </tbody>
    </table>
  )
}

describe('TransactionItem component', () => {
  it('Should be able to render with correct values', () => {
    const transaction = Object.assign(mockTransactionModel(), {
      createdAt: new Date('2023-02-10T00:00:00'),
      price: 3000
    })
    makeSut(transaction)
    expect(screen.getByTestId('description')).toHaveTextContent(transaction.description)
    expect(screen.getByTestId('category')).toHaveTextContent(transaction.category)
    expect(screen.getByTestId('price')).toHaveTextContent('R$ 3.000,00')
    expect(screen.getByTestId('price')).toHaveAttribute('data-type', transaction.type)
    expect(screen.getByTestId('created-at')).toHaveTextContent('10/02/2023')
  })
})
