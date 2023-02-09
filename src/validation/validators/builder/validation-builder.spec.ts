import { faker } from '@faker-js/faker'
import { MinLengthValidation } from '../min-length/min-length-validation'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('Should be able to return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('Should be able to return MinLengthValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(field, 5)])
  })
})
