import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Transactions from '.'

describe('Transactions component', () => {
  afterEach(cleanup)

  it('Should be able to start with initial state', () => {
    const sut = render(
      <Transactions />
    )

    expect(sut)
  })
})
