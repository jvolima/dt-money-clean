import React from 'react'
import { FormContext } from '@/presentation/contexts/form/form-context'
import { render } from '@testing-library/react'
import { Input } from '.'
import { faker } from '@faker-js/faker'

describe('Input component', () => {
  it('Should be able to begin with readOnly', () => {
    const field = faker.database.column()
    const sut = render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={field} />
    </FormContext.Provider>
    )
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
