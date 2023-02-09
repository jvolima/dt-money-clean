import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'
import { makeTransactionsValidation } from './transactions-validation-factory'

describe('TransactionsValidationFactory', () => {
  it('Should be able to make ValidationComposite with correct validations', () => {
    const composite = makeTransactionsValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('description').required().min(5).build(),
      ...Builder.field('price').required().number().build(),
      ...Builder.field('category').required().min(3).build(),
      ...Builder.field('type').required().build()
    ]))
  })
})
