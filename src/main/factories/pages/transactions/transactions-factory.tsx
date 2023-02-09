import React from 'react'
import Transactions from '@/presentation/pages/transactions'
import { makeTransactionsValidation } from './transactions-validation-factory'
import { makeRemoteAddTransaction } from '@/main/factories/usecases/add-transaction/remote-add-transaction'

export function makeTransactions (): JSX.Element {
  return (
    <Transactions
      addTransaction={makeRemoteAddTransaction()}
      validation={makeTransactionsValidation()}
    />
  )
}
