import { FieldValidationSpy } from '@/validation/test'
import { faker } from '@faker-js/faker'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('Should be able to return error if any validation fails', () => {
    const field = faker.database.column()
    const fieldValidationsSpy = [
      new FieldValidationSpy(field),
      new FieldValidationSpy(field)
    ]
    const sut = ValidationComposite.build(fieldValidationsSpy)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(field, { [field]: faker.random.word() })
    expect(error).toBe(errorMessage)
  })
})
