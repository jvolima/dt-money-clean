import { type HttpResponse } from '.'

export type HttpGetParams = {
  url: string
  query?: string
}

export interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}
