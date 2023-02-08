import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { NumberValidation } from './number-validation'

describe('NumberValidation', () => {
  it('Should be able to return error if value is not a number', () => {
    const field = faker.database.column()
    const sut = new NumberValidation(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if value is a number', () => {
    const field = faker.database.column()
    const sut = new NumberValidation(field)
    const error = sut.validate({ [field]: faker.datatype.number() })
    expect(error).toBeFalsy()
  })
})
