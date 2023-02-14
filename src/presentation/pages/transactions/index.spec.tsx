import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Transactions from '.'
import { type LoadTransactions } from '@/domain/usecases'
import { type TransactionModel } from '@/domain/models'
import { mockTransactionListModel } from '@/domain/test'
import { AddTransactionSpy, ValidationStub } from '@/presentation/test'

class LoadTransactionsSpy implements LoadTransactions {
  callsCount = 0

  async loadAll (): Promise<TransactionModel[]> {
    this.callsCount++
    return mockTransactionListModel()
  }
}

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
})
