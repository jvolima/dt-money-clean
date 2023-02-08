import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class NumberValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return new InvalidFieldError()
  }
}
