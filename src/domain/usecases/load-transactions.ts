import { type TransactionModel } from '../models'

export interface LoadTransactions {
  loadAll: () => Promise<LoadTransactions.Model[]>
}

export namespace LoadTransactions {
  export type Model = TransactionModel
}
