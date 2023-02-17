import { faker } from '@faker-js/faker'
import { type HttpResponse, type HttpPostClient, HttpStatusCode, type HttpPostParams, type HttpGetClient, type HttpGetParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word()
})

export const mockGetRequest = (query = faker.random.word()): HttpGetParams => ({
  url: faker.internet.url(),
  query
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.created
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  query?: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.query = params.query
    return this.response
  }
}
