export interface LoadTransactions {
  loadAll: (params: LoadTransactions.Params) => Promise<LoadTransactions.Model[]>
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

  export type Params = {
    query?: string
  }
}
