export type AddTransactionParams = {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: Date
}

export interface AddTransaction {
  add: (params: AddTransactionParams) => Promise<void>
}
