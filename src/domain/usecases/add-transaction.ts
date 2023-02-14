export interface AddTransaction {
  add: (params: AddTransaction.Params) => Promise<void>
}

export namespace AddTransaction {
  export type Params = {
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: Date
  }
}
