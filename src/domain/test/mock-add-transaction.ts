import { faker } from '@faker-js/faker'
import { type AddTransactionParams } from '../usecases/add-transaction'

export const mockAddTransactionParams = (): AddTransactionParams => {
  return {
    description: faker.random.words(),
    type: faker.helpers.arrayElement(['income', 'outcome']),
    price: faker.datatype.number(),
    category: faker.random.word()
  }
}
