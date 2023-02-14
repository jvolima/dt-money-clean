import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import Transactions from '.'
import { AddTransactionSpy, LoadTransactionsSpy } from '@/domain/test'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  loadTransactionsSpy: LoadTransactionsSpy
}

const makeSut = (): SutTypes => {
  const addTransactionSpy = new AddTransactionSpy()
  const validationStub = new ValidationStub()
  const loadTransactionsSpy = new LoadTransactionsSpy()
  render(<Transactions loadTransactions={loadTransactionsSpy} addTransaction={addTransactionSpy} validation={validationStub} />)
  return {
    loadTransactionsSpy
  }
}

describe('TransactionsComponent', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  it('Should be able to call LoadTransactions', async () => {
    const { loadTransactionsSpy } = makeSut()
    await waitFor(() => { expect(loadTransactionsSpy.callsCount).toBe(1) })
  })

  it('Should be able to render Transactions on success', async () => {
    makeSut()
    const tbody = screen.getByTestId('tbody')
    await waitFor(() => {
      expect(tbody.querySelectorAll('tr')).toHaveLength(3)
    })
  })
})
