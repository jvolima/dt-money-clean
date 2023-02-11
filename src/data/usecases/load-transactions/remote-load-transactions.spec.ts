import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
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

  it('Should be able to throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.forbidden
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
