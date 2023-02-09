import React from 'react'
import { cleanup, fireEvent, render, waitFor, screen } from '@testing-library/react'
import { NewTransactionModal } from '.'
import { faker } from '@faker-js/faker'
import { AddTransactionSpy, ValidationStub } from '@/presentation/test'

type SutParams = {
  validationError: string
}

type SutTypes = {
  addTransactionSpy: AddTransactionSpy
  onClose: () => void
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addTransactionSpy = new AddTransactionSpy()
  validationStub.errorMessage = params?.validationError
  const onClose = jest.fn()
  render(
    <NewTransactionModal validation={validationStub} addTransaction={addTransactionSpy} onClose={onClose} />
  )

  return {
    addTransactionSpy,
    onClose
  }
}

const testStatusForField = (fieldName: string, validationError = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

const populateField = (fieldName: string, value: string | number = faker.random.word()): void => {
  const field = screen.getByTestId(fieldName)
  fireEvent.input(field, { target: { value } })
}

const selectTransactionType = (transactionType = faker.helpers.arrayElement(['income', 'outcome'])): void => {
  const type = screen.getByTestId(transactionType)
  fireEvent.click(type)
}

const testTransactionTypeStatus = (validationError = ''): void => {
  const type = screen.getByTestId('type')
  expect(type).toHaveProperty('title', validationError)
}

const fillOutForm = (
  description = faker.random.words(),
  price = faker.datatype.number(),
  category = faker.random.word(),
  type = faker.helpers.arrayElement(['income', 'outcome'])
): void => {
  populateField('description', description)
  populateField('price', price)
  populateField('category', category)
  selectTransactionType(type)
}

const simulateValidSubmit = (
  description = faker.random.words(),
  price = faker.datatype.number(),
  category = faker.random.word(),
  type = faker.helpers.arrayElement(['income', 'outcome'])
): void => {
  fillOutForm(description, price, category, type)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
}

const testElementCallsFunction = (elementName: string, functionToTest: jest.Func): void => {
  const element = screen.getByTestId(elementName)
  fireEvent.click(element)
  expect(functionToTest).toHaveBeenCalled()
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
    makeSut({ validationError })
    testStatusForField('description', validationError)
    testStatusForField('price', validationError)
    testStatusForField('category', validationError)
    testTransactionTypeStatus(validationError)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('form-status').children).toHaveLength(0)
  })

  it('Should be able to show descriptionError if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('description')
    testStatusForField('description', validationError)
  })

  it('Should be able to show priceError if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('price')
    testStatusForField('price', validationError)
  })

  it('Should be able to show categoryError if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('category')
    testStatusForField('category', validationError)
  })

  it('Should be able to show typeError if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    selectTransactionType()
    testTransactionTypeStatus(validationError)
  })

  it('Should be able to show valid description state if validation succeeds', () => {
    makeSut()
    populateField('description')
    testStatusForField('description')
  })

  it('Should be able to show valid price state if validation succeeds', () => {
    makeSut()
    populateField('price')
    testStatusForField('price')
  })

  it('Should be able to show valid category state if validation succeeds', () => {
    makeSut()
    populateField('category')
    testStatusForField('category')
  })

  it('Should be able to show valid type state if validation succeeds', () => {
    makeSut()
    selectTransactionType()
    testTransactionTypeStatus()
  })

  it('Should be able to enable submit button if form is valid', () => {
    makeSut()
    fillOutForm()
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('Should be able to show spinner on submit', async () => {
    makeSut()
    simulateValidSubmit()
    await waitFor(() => { expect(screen.queryByTestId('spinner')).toBeInTheDocument() })
  })

  it('Should be able to call AddTransaction with correct values', async () => {
    const { addTransactionSpy } = makeSut()
    const description = faker.random.words()
    const price = faker.datatype.number()
    const category = faker.random.word()
    const type = faker.helpers.arrayElement(['income', 'outcome'])
    simulateValidSubmit(description, price, category, type)
    await waitFor(() => { expect(addTransactionSpy.params).toEqual({ description, price, category, type }) })
  })

  it('Should be able to call AddTransaction only once', async () => {
    const { addTransactionSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    await waitFor(() => {
      expect(addTransactionSpy.callsCount).toBe(1)
    })
  })

  it('Should not be able to call AddTransaction if form is invalid', () => {
    const validationError = faker.random.words()
    const { addTransactionSpy } = makeSut({ validationError })
    simulateValidSubmit()
    expect(addTransactionSpy.callsCount).toBe(0)
  })

  it('Should be able to present error if AddTransaction fails', async () => {
    const { addTransactionSpy } = makeSut()
    const error = new Error(faker.random.words())
    jest.spyOn(addTransactionSpy, 'add').mockRejectedValueOnce(error)
    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.getByTestId('form-status').children).toHaveLength(1)
      expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    })
  })

  it('Should be able to clear fields on success', async () => {
    makeSut()
    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.getByTestId('description')).toHaveTextContent('')
      expect(screen.getByTestId('price')).toHaveTextContent('')
      expect(screen.getByTestId('category')).toHaveTextContent('')
      const type = screen.getByTestId('type')
      expect(type.getAttribute('value')).toBe(null)
    })
  })

  it('Should be able to close modal using X button', () => {
    const { onClose } = makeSut()
    testElementCallsFunction('close-modal-button', onClose)
  })

  it('Should be able to close modal when click on overlay', () => {
    const { onClose } = makeSut()
    testElementCallsFunction('overlay', onClose)
  })
})
