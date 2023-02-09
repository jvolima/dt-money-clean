import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  it('Should be able to open modal when click on new transaction button', () => {
    const handleOpenModal = jest.fn()
    render(
      <Header handleOpenModal={handleOpenModal} />
    )
    const newTransactionButton = screen.getByTestId('new-transaction-button')
    fireEvent.click(newTransactionButton)
    expect(handleOpenModal).toHaveBeenCalled()
  })
})
