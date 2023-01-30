import { type HttpResponse, type HttpPostClient, HttpStatusCode } from '../protocols/http'

interface HttpPostParams {
  url: string
  body: any
}

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.created
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}
