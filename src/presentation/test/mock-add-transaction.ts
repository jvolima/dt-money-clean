import { type AddTransactionParams, type AddTransaction } from '@/domain/usecases/add-transaction'

export class AddTransactionSpy implements AddTransaction {
  params: AddTransactionParams
  callsCount = 0

  async add (params: AddTransactionParams): Promise<void> {
    this.params = params
    this.callsCount += 1
  }
}
