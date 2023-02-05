import React from 'react'
import { cleanup, fireEvent, render, waitFor, type RenderResult } from '@testing-library/react'
import { NewTransactionModal } from '.'
import { faker } from '@faker-js/faker'
import { AddTransactionSpy, ValidationStub } from '@/presentation/test'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  addTransactionSpy: AddTransactionSpy
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addTransactionSpy = new AddTransactionSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <NewTransactionModal validation={validationStub} addTransaction={addTransactionSpy} onClose={() => {}} />
  )

  return {
    sut,
    addTransactionSpy
  }
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError = ''): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

const populateField = (sut: RenderResult, fieldName: string, value: string | number = faker.random.word()): void => {
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

const testButtonIsDisabled = (sut: RenderResult, disabled: boolean): void => {
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  expect(submitButton.disabled).toBe(disabled)
}

const fillOutForm = (
  sut: RenderResult,
  description = faker.random.words(),
  price = faker.datatype.number(),
  category = faker.random.word(),
  type = faker.helpers.arrayElement(['income', 'outcome'])
): void => {
  populateField(sut, 'description', description)
  populateField(sut, 'price', price)
  populateField(sut, 'category', category)
  selectTransactionType(sut, type)
}

const simulateValidSubmit = (
  sut: RenderResult,
  description = faker.random.words(),
  price = faker.datatype.number(),
  category = faker.random.word(),
  type = faker.helpers.arrayElement(['income', 'outcome'])
): void => {
  fillOutForm(sut, description, price, category, type)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
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
    const { sut } = makeSut({ validationError })
    testStatusForField(sut, 'description', validationError)
    testStatusForField(sut, 'price', validationError)
    testStatusForField(sut, 'category', validationError)
    testTransactionTypeStatus(sut, validationError)
    testButtonIsDisabled(sut, true)
    const formStatus = sut.getByTestId('form-status')
    expect(formStatus.childElementCount).toBe(0)
  })

  it('Should be able to show descriptionError if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'description')
    testStatusForField(sut, 'description', validationError)
  })

  it('Should be able to show priceError if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'price')
    testStatusForField(sut, 'price', validationError)
  })

  it('Should be able to show categoryError if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'category')
    testStatusForField(sut, 'category', validationError)
  })

  it('Should be able to show typeError if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    selectTransactionType(sut)
    testTransactionTypeStatus(sut, validationError)
  })

  it('Should be able to show valid description state if validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'description')
    testStatusForField(sut, 'description')
  })

  it('Should be able to show valid price state if validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'price')
    testStatusForField(sut, 'price')
  })

  it('Should be able to show valid category state if validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'category')
    testStatusForField(sut, 'category')
  })

  it('Should be able to show valid type state if validation succeeds', () => {
    const { sut } = makeSut()
    selectTransactionType(sut)
    testTransactionTypeStatus(sut)
  })

  it('Should be able to enable submit button if form is valid', () => {
    const { sut } = makeSut()
    fillOutForm(sut)
    testButtonIsDisabled(sut, false)
  })

  it('Should be able to show spinner on submit', async () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => {
      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  it('Should be able to call AddTransaction with correct values', async () => {
    const { sut, addTransactionSpy } = makeSut()
    const description = faker.random.words()
    const price = faker.datatype.number()
    const category = faker.random.word()
    const type = faker.helpers.arrayElement(['income', 'outcome'])
    simulateValidSubmit(sut, description, price, category, type)
    await waitFor(() => {
      expect(addTransactionSpy.params).toEqual({ description, price, category, type })
    })
  })

  it('Should be able to call AddTransaction only once', async () => {
    const { sut, addTransactionSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    await waitFor(() => {
      expect(addTransactionSpy.callsCount).toBe(1)
    })
  })

  it('Should not be able to call AddTransaction if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, addTransactionSpy } = makeSut({ validationError })
    simulateValidSubmit(sut)
    expect(addTransactionSpy.callsCount).toBe(0)
  })

  it('Should be able to present error if AddTransaction fails', async () => {
    const { sut, addTransactionSpy } = makeSut()
    const error = new Error(faker.random.words())
    jest.spyOn(addTransactionSpy, 'add').mockRejectedValueOnce(error)
    simulateValidSubmit(sut)
    await waitFor(() => {
      const formStatus = sut.getByTestId('form-status')
      expect(formStatus.childElementCount).toBe(1)
      const mainError = sut.getByTestId('main-error')
      expect(mainError.textContent).toBe(error.message)
    })
  })

  it('Should be able to clear fields on success', async () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => {
      const description = sut.getByTestId('description')
      expect(description.textContent).toBe('')
      const price = sut.getByTestId('price')
      expect(price.textContent).toBe('')
      const category = sut.getByTestId('category')
      expect(category.textContent).toBe('')
      const type = sut.getByTestId('type')
      expect(type.getAttribute('value')).toBe(null)
    })
  })
})
