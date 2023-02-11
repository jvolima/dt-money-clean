import { type HttpGetClient } from '@/data/protocols/http'
import { type TransactionModel } from '@/domain/models'

export class RemoteLoadTransactions {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<TransactionModel[]>
  ) {}

  async loadAll (): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
