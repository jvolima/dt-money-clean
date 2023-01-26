export type AddTransactionParams = {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

export interface AddTransaction {
  add: (params: AddTransactionParams) => Promise<void>
}
