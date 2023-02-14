import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy, mockRemoteTransactionsModel } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { RemoteLoadTransactions } from './remote-load-transactions'

type SutTypes = {
  sut: RemoteLoadTransactions
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadTransactions.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadTransactions.Model[]>()
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

  it('Should be able to return a list of LoadTransactions.Model if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteTransactionsModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const transactions = await sut.loadAll()
    expect(transactions).toEqual([{
      id: httpResult[0].id,
      description: httpResult[0].description,
      category: httpResult[0].category,
      price: httpResult[0].price,
      type: httpResult[0].type,
      createdAt: new Date(httpResult[0].createdAt)
    }, {
      id: httpResult[1].id,
      description: httpResult[1].description,
      category: httpResult[1].category,
      price: httpResult[1].price,
      type: httpResult[1].type,
      createdAt: new Date(httpResult[1].createdAt)
    }, {
      id: httpResult[2].id,
      description: httpResult[2].description,
      category: httpResult[2].category,
      price: httpResult[2].price,
      type: httpResult[2].type,
      createdAt: new Date(httpResult[2].createdAt)
    }])
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
