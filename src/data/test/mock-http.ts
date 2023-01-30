import { faker } from '@faker-js/faker'
import { type HttpResponse, type HttpPostClient, HttpStatusCode, type HttpPostParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word()
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
