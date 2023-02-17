import { SearchForm } from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TransactionsContext } from '@/presentation/contexts'

describe('SearchForm component', () => {
  it('Should be able to call loadTransactions on submit', () => {
    const loadDataSpy = jest.fn()
    render(
      <TransactionsContext.Provider value={{ state: { loadData: loadDataSpy } }}>
        <SearchForm />
      </TransactionsContext.Provider>
    )
    const search = screen.getByTestId('search')
    fireEvent.click(search)
    expect(loadDataSpy).toHaveBeenCalled()
  })
})
