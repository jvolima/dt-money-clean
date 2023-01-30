import { faker } from '@faker-js/faker'
import type axios from 'axios'
import { mockAxios } from '../test'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('Should be able to call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = {
      url: faker.internet.url(),
      body: faker.random.word()
    }
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
