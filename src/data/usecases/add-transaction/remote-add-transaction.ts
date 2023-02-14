import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { type AddTransaction } from '@/domain/usecases/add-transaction'

export class RemoteAddTransaction {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAddTransaction.Params, void>
  ) {}

  async add (params: AddTransaction.Params): Promise<void> {
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

export namespace RemoteAddTransaction {
  export type Params = AddTransaction.Params
}
