import { faker } from '@faker-js/faker'
import { type RemoteLoadTransactions } from '@/data/usecases/load-transactions/remote-load-transactions'

export const mockRemoteTransactionModel = (): RemoteLoadTransactions.Model => ({
  id: faker.datatype.number(),
  category: faker.random.word(),
  description: faker.random.words(),
  createdAt: faker.datatype.datetime().toISOString(),
  price: faker.datatype.number(),
  type: faker.helpers.arrayElement(['income', 'outcome'])
})

export const mockRemoteTransactionListModel = (): RemoteLoadTransactions.Model[] => ([
  mockRemoteTransactionModel(),
  mockRemoteTransactionModel(),
  mockRemoteTransactionModel()
])
