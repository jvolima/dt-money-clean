import { type LoadTransactions } from '@/domain/usecases'

export const sortListByDate = (list: []): any[] => {
  return list?.sort(
    (a: LoadTransactions.Model, b: LoadTransactions.Model) => b.createdAt.getTime() - a.createdAt.getTime()
  ) || []
}
