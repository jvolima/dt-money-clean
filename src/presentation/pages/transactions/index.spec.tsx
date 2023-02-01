import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Transactions from '.'

describe('Transactions component', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  afterEach(cleanup)

  it('Should be able to start with initial state', () => {
    const sut = render(
      <Transactions />
    )

    const category = sut.getByTestId('category')

    expect(category)
  })
})
