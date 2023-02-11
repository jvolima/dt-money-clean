import { type Transaction } from '../models'

export interface LoadTransactions {
  loadAll: () => Promise<Transaction[]>
}
