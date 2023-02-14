import { faker } from '@faker-js/faker'
import { type LoadTransactions } from '@/domain/usecases'

export const mockTransactionModel = (): LoadTransactions.Model => ({
  id: faker.datatype.number(),
  category: faker.random.word(),
  description: faker.random.words(),
  createdAt: faker.datatype.datetime(),
  price: faker.datatype.number(),
  type: faker.helpers.arrayElement(['income', 'outcome'])
})

export const mockTransactionListModel = (): LoadTransactions.Model[] => ([
  mockTransactionModel(),
  mockTransactionModel(),
  mockTransactionModel()
])

export class LoadTransactionsSpy implements LoadTransactions {
  callsCount = 0
  transactions = mockTransactionListModel()

  async loadAll (): Promise<LoadTransactions.Model[]> {
    this.callsCount++
    return this.transactions
  }
}
