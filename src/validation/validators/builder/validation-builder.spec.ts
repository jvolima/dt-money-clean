import { faker } from '@faker-js/faker'
import { MinLengthValidation, NumberValidation, RequiredFieldValidation } from '@/validation/validators'
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

  it('Should be able to return NumberValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).number().build()
    expect(validations).toEqual([new NumberValidation(field)])
  })

  it('Should be able to return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(field).required().min(length).number().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new NumberValidation(field)
    ])
  })
})
