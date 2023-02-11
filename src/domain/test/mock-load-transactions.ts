import { faker } from '@faker-js/faker'
import { type TransactionModel } from '../models'

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
