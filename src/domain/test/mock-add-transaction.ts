import { faker } from '@faker-js/faker'
import { type AddTransaction, type AddTransactionParams } from '../usecases/add-transaction'

export const mockAddTransactionParams = (): AddTransactionParams => {
  return {
    description: faker.random.words(),
    type: faker.helpers.arrayElement(['income', 'outcome']),
    price: faker.datatype.number(),
    category: faker.random.word(),
    createdAt: faker.datatype.datetime()
  }
}

export class AddTransactionSpy implements AddTransaction {
  params: AddTransactionParams
  callsCount = 0

  async add (params: AddTransactionParams): Promise<void> {
    this.params = params
    this.callsCount += 1
  }
}
