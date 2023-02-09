import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/presentation/App'
import { makeTransactions } from './factories/pages/transactions/transactions-factory'

ReactDOM.render(
  <App makeTransactions={makeTransactions} />,
  document.getElementById('main')
)
