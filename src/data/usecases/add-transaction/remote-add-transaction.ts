import { type AddTransactionParams } from '@/domain/usecases/add-transaction'

export class RemoteAddTransaction {
  constructor (
    private readonly url: string,
    private readonly httpPostClient
  ) {}

  async add (params: AddTransactionParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
