interface HttpPostParams {
  url: string
}

export class HttpPostClientSpy {
  url?: string

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
  }
}
