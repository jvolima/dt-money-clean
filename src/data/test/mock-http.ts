interface HttpPostParams {
  url: string
  body: any
}

export class HttpPostClientSpy {
  url?: string
  body: any

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
  }
}
