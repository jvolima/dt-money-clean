import { HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { type TransactionModel } from '@/domain/models'
import { type LoadTransactions } from '@/domain/usecases'

export class RemoteLoadTransactions implements LoadTransactions {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<TransactionModel[]>
  ) {}

  async loadAll (): Promise<TransactionModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
