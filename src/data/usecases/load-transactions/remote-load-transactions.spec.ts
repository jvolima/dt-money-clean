import { HttpGetClientSpy } from '@/data/test'
import { type TransactionModel } from '@/domain/models'
import { faker } from '@faker-js/faker'
import { RemoteLoadTransactions } from './remote-load-transactions'

type SutTypes = {
  sut: RemoteLoadTransactions
  httpGetClientSpy: HttpGetClientSpy<TransactionModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<TransactionModel[]>()
  const sut = new RemoteLoadTransactions(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadTransactions', () => {
  it('Should be able to call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
