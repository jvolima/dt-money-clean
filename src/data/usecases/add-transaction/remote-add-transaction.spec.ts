interface HttpPostParams {
  url: string
}

class HttpPostClientSpy {
  url?: string

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
  }
}

class RemoteAddTransaction {
  constructor (
    private readonly url: string,
    private readonly httpPostClient
  ) {}

  async add (): Promise<void> {
    await this.httpPostClient.post({
      url: this.url
    })
  }
}

describe('RemoteAddTransaction', () => {
  it('Should be able to call HttpPostClient with correct URL', async () => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const url = 'http://localhost:3333'
    const sut = new RemoteAddTransaction(url, httpPostClientSpy)
    await sut.add()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
