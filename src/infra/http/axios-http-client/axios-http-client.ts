import { type HttpPostClient, type HttpPostParams, type HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    await axios.post(params.url, params.body)

    return null
  }
}
