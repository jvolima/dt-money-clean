import { HttpPostClientSpy } from '@/data/test'
import { RemoteAddTransaction } from './remote-add-transaction'
import { faker } from '@faker-js/faker'

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

    await sut.add()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
