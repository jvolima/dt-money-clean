import { type TransactionModel } from '../models'

export interface LoadTransactions {
  loadAll: () => Promise<TransactionModel[]>
}
