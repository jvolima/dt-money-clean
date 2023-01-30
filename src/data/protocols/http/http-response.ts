export enum HttpStatusCode {
  created = 201,
  badRequest = 400
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
