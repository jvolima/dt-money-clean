export class RemoteAddTransaction {
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
