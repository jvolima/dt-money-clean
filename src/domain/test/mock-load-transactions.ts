import { faker } from '@faker-js/faker'
import { type TransactionModel } from '../models'
import { type LoadTransactions } from '../usecases'

export const mockTransactionModel = (): TransactionModel => ({
  id: faker.datatype.number(),
  category: faker.random.word(),
  description: faker.random.words(),
  createdAt: faker.datatype.datetime(),
  price: faker.datatype.number(),
  type: faker.helpers.arrayElement(['income', 'outcome'])
})

export const mockTransactionListModel = (): TransactionModel[] => ([
  mockTransactionModel(),
  mockTransactionModel(),
  mockTransactionModel()
])

export class LoadTransactionsSpy implements LoadTransactions {
  callsCount = 0

  async loadAll (): Promise<TransactionModel[]> {
    this.callsCount++
    return mockTransactionListModel()
  }
}
