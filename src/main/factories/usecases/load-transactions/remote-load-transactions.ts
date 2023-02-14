import { RemoteLoadTransactions } from '@/data/usecases'
import { type LoadTransactions } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteLoadTransactions = (): LoadTransactions => {
  return new RemoteLoadTransactions(makeApiUrl('/transactions'), makeAxiosHttpClient())
}
