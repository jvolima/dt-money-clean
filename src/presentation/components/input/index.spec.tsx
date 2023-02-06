import React from 'react'
import { FormContext } from '@/presentation/contexts/form/form-context'
import { fireEvent, render, type RenderResult } from '@testing-library/react'
import { Input } from '.'
import { faker } from '@faker-js/faker'

describe('Input component', () => {
  const makeSut = (field: string): RenderResult => {
    const sut = render(
      <FormContext.Provider value={{ state: {} }}>
        <Input name={field} />
      </FormContext.Provider>
    )

    return sut
  }

  it('Should be able to begin with readOnly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should be able to remove readOnly on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
