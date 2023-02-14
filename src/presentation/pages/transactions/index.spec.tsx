import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import Transactions from '.'
import { AddTransactionSpy, LoadTransactionsSpy } from '@/domain/test'
import { ValidationStub } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  loadTransactionsSpy: LoadTransactionsSpy
}

const makeSut = (loadTransactionsSpy = new LoadTransactionsSpy()): SutTypes => {
  const addTransactionSpy = new AddTransactionSpy()
  const validationStub = new ValidationStub()
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
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  it('Should be able to render error on failure', async () => {
    const loadTransactionsSpy = new LoadTransactionsSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadTransactionsSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadTransactionsSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('tbody')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })
})
