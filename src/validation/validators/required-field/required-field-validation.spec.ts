import { faker } from '@faker-js/faker'
import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  it('Should be able to return error if field is empty', () => {
    const field = faker.database.column()
    const sut = new RequiredFieldValidation(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })
})
