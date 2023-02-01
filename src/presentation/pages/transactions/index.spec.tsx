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

    const descriptionWrap = sut.getByTestId('description-wrap')
    const description = sut.getByTestId('description')
    const descriptionLabel = sut.getByTestId('description-label')
    expect(descriptionWrap.getAttribute('data-status')).toBe('invalid')
    expect(description.title).toBe('Campo obrigatório')
    expect(descriptionLabel.title).toBe('Campo obrigatório')

    const priceWrap = sut.getByTestId('price-wrap')
    const price = sut.getByTestId('price')
    const priceLabel = sut.getByTestId('price-label')
    expect(priceWrap.getAttribute('data-status')).toBe('invalid')
    expect(price.title).toBe('Campo obrigatório')
    expect(priceLabel.title).toBe('Campo obrigatório')

    const categoryWrap = sut.getByTestId('category-wrap')
    const category = sut.getByTestId('category')
    const categoryLabel = sut.getByTestId('category-label')
    expect(categoryWrap.getAttribute('data-status')).toBe('invalid')
    expect(category.title).toBe('Campo obrigatório')
    expect(categoryLabel.title).toBe('Campo obrigatório')

    const type = sut.getByTestId('type')
    expect(type.title).toBe('Campo obrigatório')

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
