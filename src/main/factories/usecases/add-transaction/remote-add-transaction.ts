import { RemoteAddTransaction } from '@/data/usecases/add-transaction/remote-add-transaction'
import { type AddTransaction } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAddTransaction = (): AddTransaction => {
  return new RemoteAddTransaction(makeApiUrl('/add'), makeAxiosHttpClient())
}
