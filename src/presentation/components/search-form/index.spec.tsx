import { SearchForm } from '.'
import { TransactionsContext } from '@/presentation/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import React from 'react'

type SutTypes = {
  loadDataSpy: (query?: string) => void
}

const makeSut = (): SutTypes => {
  const loadDataSpy = jest.fn()
  render(
    <TransactionsContext.Provider value={{ state: { loadData: loadDataSpy } }}>
      <SearchForm />
    </TransactionsContext.Provider>
  )
  return {
    loadDataSpy
  }
}

describe('SearchForm component', () => {
  it('Should be able to call loadTransactions on submit', () => {
    const { loadDataSpy } = makeSut()
    const value = faker.random.word()
    const input = screen.getByTestId('search-input')
    fireEvent.input(input, { target: { value } })
    const search = screen.getByTestId('search')
    fireEvent.click(search)
    expect(loadDataSpy).toHaveBeenCalledWith(value)
  })
})
