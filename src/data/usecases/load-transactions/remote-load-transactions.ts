import { HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { type TransactionModel } from '@/domain/models'

export class RemoteLoadTransactions {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<TransactionModel[]>
  ) {}

  async loadAll (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new UnexpectedError()
      default: break
    }
  }
}
