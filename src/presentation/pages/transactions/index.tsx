import React, { useEffect, useState } from 'react'
import { Header, Summary, NewTransactionModal, SearchForm, LoadError, TransactionsTable } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols/validation'
import { TransactionsContainer } from './styles'
import { type LoadTransactions, type AddTransaction } from '@/domain/usecases'
import { TransactionsContext } from '@/presentation/contexts'

type Props = {
  validation: Validation
  addTransaction: AddTransaction
  loadTransactions: LoadTransactions
}

export default function Transactions ({ addTransaction, validation, loadTransactions }: Props): JSX.Element {
  const [state, setState] = useState({
    transactions: [],
    error: ''
  })

  function handleOpenModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.showModal()
  }

  function handleCloseModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.close()
  }

  useEffect(() => {
    loadTransactions.loadAll().then(data => {
      setState({
        ...state,
        transactions: data
      })
    }).catch(error => {
      setState({
        ...state,
        error: error.message
      })
    })
  }, [])

  return (
    <>
      <Header handleOpenModal={handleOpenModal} />
      <dialog data-testid="modal" id="modal">
        <NewTransactionModal addTransaction={addTransaction} validation={validation} onClose={handleCloseModal} />
      </dialog>
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsContext.Provider value={{ state }}>
          {state.error ? <LoadError /> : <TransactionsTable />}
        </TransactionsContext.Provider>
      </TransactionsContainer>
    </>
  )
}
