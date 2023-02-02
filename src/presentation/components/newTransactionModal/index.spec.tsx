import React from 'react'
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react'
import { NewTransactionModal } from '.'
import { faker } from '@faker-js/faker'
import { ValidationStub } from '@/presentation/test'

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): RenderResult => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <NewTransactionModal validation={validationStub} onClose={() => {}} />
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
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })

    testStatusForField(sut, 'description', validationError)
    testStatusForField(sut, 'price', validationError)
    testStatusForField(sut, 'category', 'Campo obrigatório')

    const type = sut.getByTestId('type')
    expect(type.title).toBe('Campo obrigatório')

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('Should be able to show descriptionError if validation fails', () => {
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })
    const description = sut.getByTestId('description')
    fireEvent.input(description, { target: { value: faker.random.word() } })
    testStatusForField(sut, 'description', validationError)
  })

  it('Should be able to show priceError if validation fails', () => {
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })
    const price = sut.getByTestId('price')
    fireEvent.input(price, { target: { value: faker.random.word() } })
    testStatusForField(sut, 'price', validationError)
  })
})
