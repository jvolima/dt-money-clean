import { type HttpGetClient, type HttpGetParams, type HttpPostClient, type HttpPostParams, type HttpResponse } from '@/data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post (params: HttpPostParams<any>): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      body: axiosResponse.data,
      statusCode: axiosResponse.status
    }
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const axiosResponse = await axios.get(params.url)
    return {
      body: axiosResponse.data,
      statusCode: axiosResponse.status
    }
  }
}
