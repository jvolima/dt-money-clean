import { type AddTransactionParams, type AddTransaction } from '@/domain/usecases/add-transaction'

export class AddTransactionSpy implements AddTransaction {
  params: AddTransactionParams

  async add (params: AddTransactionParams): Promise<void> {
    this.params = params
  }
}
