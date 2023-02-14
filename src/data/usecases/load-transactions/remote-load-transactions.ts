import { HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { type LoadTransactions } from '@/domain/usecases'

export class RemoteLoadTransactions implements LoadTransactions {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadTransactions.Model[]>
  ) {}

  async loadAll (): Promise<LoadTransactions.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    const remoteTransactions = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteTransactions.map(remoteTransaction => Object.assign(remoteTransaction, {
        createdAt: new Date(remoteTransaction.createdAt)
      }))
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadTransactions {
  export type Model = {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: string
  }
}
