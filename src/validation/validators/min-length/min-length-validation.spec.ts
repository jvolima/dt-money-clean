import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  it('Should be able to return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = new MinLengthValidation(field, 5)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })
})
