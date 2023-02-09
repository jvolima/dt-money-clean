import React from 'react'
import { FormContext } from '@/presentation/contexts/form/form-context'
import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from '.'
import { faker } from '@faker-js/faker'

describe('Input component', () => {
  const makeSut = (field: string): void => {
    render(
      <FormContext.Provider value={{ state: {} }}>
        <Input name={field} />
      </FormContext.Provider>
    )
  }

  it('Should be able to begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should be able to remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  it('Should be able to focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field)
    const label = screen.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
