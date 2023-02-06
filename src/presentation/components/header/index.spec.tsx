import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Header } from '.'

jest.mock('')

describe('Header component', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))

    HTMLDialogElement.prototype.showModal = jest.fn()
  })

  it('Should be able to open modal when click on new transaction button', () => {
    const sut = render(
      <Header />
    )
    const newTransactionButton = sut.getByTestId('new-transaction-button')
    fireEvent.click(newTransactionButton)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
  })
})
