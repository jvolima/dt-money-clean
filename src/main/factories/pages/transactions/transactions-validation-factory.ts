import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

export const makeTransactionsValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('description').required().min(5).build(),
    ...Builder.field('price').required().number().build(),
    ...Builder.field('category').required().min(3).build(),
    ...Builder.field('type').required().build()
  ])
}
