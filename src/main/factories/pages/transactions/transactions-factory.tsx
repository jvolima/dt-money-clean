import React from 'react'
import Transactions from '@/presentation/pages/transactions'
import { makeTransactionsValidation } from './transactions-validation-factory'
import { makeRemoteAddTransaction, makeRemoteLoadTransactions } from '@/main/factories/usecases'

export function makeTransactions (): JSX.Element {
  return (
    <Transactions
      addTransaction={makeRemoteAddTransaction()}
      validation={makeTransactionsValidation()}
      loadTransactions={makeRemoteLoadTransactions()}
    />
  )
}
