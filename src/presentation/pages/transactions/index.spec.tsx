import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import Transactions from '.'
import { AddTransactionSpy, LoadTransactionsSpy } from '@/domain/test'
import { ValidationStub } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

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

global.HTMLDialogElement.prototype.showModal = jest.fn()
global.HTMLDialogElement.prototype.close = jest.fn()

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

  it('Should be able to open NewTransactionModal', async () => {
    makeSut()
    const openModal = screen.getByTestId('new-transaction-button')
    await waitFor(() => {
      fireEvent.click(openModal)
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
    })
  })

  it('Should be able to close NewTransactionModal', async () => {
    makeSut()
    const closeModal = screen.getByTestId('close-modal-button')
    await waitFor(() => {
      fireEvent.click(closeModal)
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
    })
  })

  it('Should be able to toggle reload', async () => {
    const { loadTransactionsSpy } = makeSut()
    fireEvent.input(screen.getByTestId('description'), { target: { value: faker.random.word() } })
    fireEvent.input(screen.getByTestId('category'), { target: { value: faker.random.word() } })
    fireEvent.input(screen.getByTestId('price'), { target: { value: faker.datatype.number() } })
    fireEvent.click(screen.getByTestId('income'))
    const form = screen.getByTestId('form')
    await waitFor(() => {
      fireEvent.submit(form)
      expect(loadTransactionsSpy.callsCount).toBe(2)
    })
  })

  it('Should be able to call LoadTransactions on reload', async () => {
    const loadTransactionsSpy = new LoadTransactionsSpy()
    jest.spyOn(loadTransactionsSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadTransactionsSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
      expect(loadTransactionsSpy.callsCount).toBe(1)
    })
  })
})
