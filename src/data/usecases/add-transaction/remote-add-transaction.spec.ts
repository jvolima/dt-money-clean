import { HttpPostClientSpy } from '@/data/test'
import { RemoteAddTransaction } from './remote-add-transaction'
import { faker } from '@faker-js/faker'
import { mockAddTransactionParams } from '@/domain/test'
import { type AddTransactionParams } from '@/domain/usecases/add-transaction'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddTransaction
  httpPostClientSpy: HttpPostClientSpy<AddTransactionParams, void>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddTransactionParams, void>()
  const sut = new RemoteAddTransaction(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddTransaction', () => {
  it('Should be able to call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.add(mockAddTransactionParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should be able to call HttpPostClient with correct body', async () => {
    const transaction = mockAddTransactionParams()
    const { sut, httpPostClientSpy } = makeSut()
    await sut.add(transaction)
    expect(httpPostClientSpy.body).toEqual(transaction)
  })

  it('Should be able to throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response.statusCode = HttpStatusCode.badRequest
    const promise = sut.add(mockAddTransactionParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should be able to throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response.statusCode = HttpStatusCode.notFound
    const promise = sut.add(mockAddTransactionParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
