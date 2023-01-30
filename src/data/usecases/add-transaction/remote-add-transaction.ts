import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { type AddTransactionParams } from '@/domain/usecases/add-transaction'

export class RemoteAddTransaction {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddTransactionParams, void>
  ) {}

  async add (params: AddTransactionParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: return
      default: throw new UnexpectedError()
    }
  }
}
