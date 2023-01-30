import { HttpPostClientSpy } from '@/data/test'
import { RemoteAddTransaction } from './remote-add-transaction'
import { faker } from '@faker-js/faker'
import { type AddTransactionParams } from '@/domain/usecases/add-transaction'

type SutTypes = {
  sut: RemoteAddTransaction
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
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

    await sut.add({
      description: 'description',
      type: 'income',
      price: 10,
      category: 'test'
    })
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should be able to call HttpPostClient with correct body', async () => {
    const transaction: AddTransactionParams = {
      description: 'description',
      type: 'income',
      price: 10,
      category: 'test'
    }
    const { sut, httpPostClientSpy } = makeSut()
    await sut.add(transaction)
    expect(httpPostClientSpy.body).toEqual(transaction)
  })
})
