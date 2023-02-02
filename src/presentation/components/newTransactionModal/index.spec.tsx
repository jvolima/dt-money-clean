import React from 'react'
import { cleanup, render, type RenderResult } from '@testing-library/react'
import { NewTransactionModal } from '.'

const makeSut = (): RenderResult => {
  const sut = render(
    <NewTransactionModal onClose={() => {}} />
  )

  return sut
}

const testStatusForField = (sut: RenderResult, fieldName: string, error: string): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(error ? 'invalid' : 'valid')
  expect(field.title).toBe(error)
  expect(label.title).toBe(error)
}

describe('NewTransactionModal component', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  afterEach(cleanup)

  it('Should be able to start with initial state', () => {
    const sut = makeSut()

    testStatusForField(sut, 'description', 'Campo obrigatório')
    testStatusForField(sut, 'price', 'Campo obrigatório')
    testStatusForField(sut, 'category', 'Campo obrigatório')

    const type = sut.getByTestId('type')
    expect(type.title).toBe('Campo obrigatório')

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
