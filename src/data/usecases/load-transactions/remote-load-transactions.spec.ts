import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { type TransactionModel } from '@/domain/models'
import { mockTransactionListModel } from '@/domain/test'
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

  it('Should be able to return a list of TransactionsModel if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockTransactionListModel()
    httpGetClientSpy.response.body = httpResult
    const transactions = await sut.loadAll()
    expect(transactions).toEqual(httpResult)
  })

  it('Should be able to return an empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.noContent
    const transactions = await sut.loadAll()
    expect(transactions).toEqual([])
  })

  it('Should be able to throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.forbidden
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should be able to throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.notFound
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should be able to throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.serverError
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
