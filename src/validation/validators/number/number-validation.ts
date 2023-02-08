import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class NumberValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    if (Number.isNaN(input[this.field]) || typeof input[this.field] !== 'number') {
      return new InvalidFieldError()
    }
    return null
  }
}
