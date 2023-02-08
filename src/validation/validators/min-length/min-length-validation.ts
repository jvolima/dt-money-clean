import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, readonly count: number) {}

  validate (input: object): Error {
    return new InvalidFieldError()
  }
}
