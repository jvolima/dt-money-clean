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

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const field = sut.getByTestId(fieldName)
  fireEvent.input(field, { target: { value } })
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
    testStatusForField(sut, 'category', validationError)

    const type = sut.getByTestId('type')
    expect(type.title).toBe(validationError)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('Should be able to show descriptionError if validation fails', () => {
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })
    populateField(sut, 'description')
    testStatusForField(sut, 'description', validationError)
  })

  it('Should be able to show priceError if validation fails', () => {
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })
    populateField(sut, 'price')
    testStatusForField(sut, 'price', validationError)
  })

  it('Should be able to show categoryError if validation fails', () => {
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })
    populateField(sut, 'category')
    testStatusForField(sut, 'category', validationError)
  })

  it('Should be able to show typeError if validation fails', () => {
    const validationError = faker.random.words()
    const sut = makeSut({ validationError })
    const type = sut.getByTestId('type')
    const income = sut.getByTestId('income')
    const outcome = sut.getByTestId('outcome')
    fireEvent.click(faker.helpers.arrayElement([income, outcome]))
    expect(type.title).toBe(validationError)
  })
})
