export interface LoadTransactions {
  loadAll: () => Promise<LoadTransactions.Model[]>
}

export namespace LoadTransactions {
  export type Model = {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: Date
  }
}
