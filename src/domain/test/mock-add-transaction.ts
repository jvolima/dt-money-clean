import { faker } from '@faker-js/faker'
import { type AddTransaction } from '@/domain/usecases'

export const mockAddTransactionParams = (): AddTransaction.Params => {
  return {
    description: faker.random.words(),
    type: faker.helpers.arrayElement(['income', 'outcome']),
    price: faker.datatype.number(),
    category: faker.random.word(),
    createdAt: faker.datatype.datetime()
  }
}

export class AddTransactionSpy implements AddTransaction {
  params: AddTransaction.Params
  callsCount = 0

  async add (params: AddTransaction.Params): Promise<void> {
    this.params = params
    this.callsCount += 1
  }
}
