export enum HttpStatusCode {
  created = 201,
  badRequest = 400,
  notFound = 404
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
