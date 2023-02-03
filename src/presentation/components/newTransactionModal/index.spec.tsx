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

const testStatusForField = (sut: RenderResult, fieldName: string, validationError = ''): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const field = sut.getByTestId(fieldName)
  fireEvent.input(field, { target: { value } })
}

const selectTransactionType = (sut: RenderResult, transactionType = faker.helpers.arrayElement(['income', 'outcome'])): void => {
  const type = sut.getByTestId(transactionType)
  fireEvent.click(type)
}

const testTransactionTypeStatus = (sut: RenderResult, validationError = ''): void => {
  const type = sut.getByTestId('type')
  expect(type.title).toBe(validationError)
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
    testTransactionTypeStatus(sut, validationError)

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
    selectTransactionType(sut)
    testTransactionTypeStatus(sut, validationError)
  })

  it('Should be able to show valid description state if validation succeeds', () => {
    const sut = makeSut()
    populateField(sut, 'description')
    testStatusForField(sut, 'description')
  })

  it('Should be able to show valid price state if validation succeeds', () => {
    const sut = makeSut()
    populateField(sut, 'price')
    testStatusForField(sut, 'price')
  })

  it('Should be able to show valid category state if validation succeeds', () => {
    const sut = makeSut()
    populateField(sut, 'category')
    testStatusForField(sut, 'category')
  })

  it('Should be able to show valid type state if validation succeeds', () => {
    const sut = makeSut()
    selectTransactionType(sut)
    testTransactionTypeStatus(sut)
  })

  it('Should be able to enable submit button if form is valid', () => {
    const sut = makeSut()
    populateField(sut, 'description')
    populateField(sut, 'price')
    populateField(sut, 'category')
    selectTransactionType(sut)

    const button = sut.getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })

  it('Should be able to show spinner on submit', () => {
    const sut = makeSut()
    populateField(sut, 'description')
    populateField(sut, 'price')
    populateField(sut, 'category')
    selectTransactionType(sut)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})
