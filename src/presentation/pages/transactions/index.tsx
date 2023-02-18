import { Header, Summary, NewTransactionModal, SearchForm, LoadError, TransactionsTable } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols'
import { type LoadTransactions, type AddTransaction } from '@/domain/usecases'
import { TransactionsContext } from '@/presentation/contexts'
import { TransactionsContainer } from './styles'
import React, { useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addTransaction: AddTransaction
  loadTransactions: LoadTransactions
}

export default function Transactions ({ addTransaction, validation, loadTransactions }: Props): JSX.Element {
  const [state, setState] = useState({
    transactions: [],
    error: '',
    reload: false,
    loadData
  })

  function handleOpenModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.showModal()
  }

  function handleCloseModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.close()
  }

  function toggleReload (): void {
    setState({ ...state, reload: !state.reload })
  }

  function loadData (query?: string): void {
    loadTransactions.loadAll({ query }).then(data => {
      setState({
        ...state,
        transactions: data
      })
    }).catch(() => {
      setState({
        ...state,
        error: 'Algo de errado aconteceu. Tente novamente em breve.'
      })
    })
  }

  useEffect(() => {
    loadData()
  }, [state.reload])

  return (
    <>
      <Header handleOpenModal={handleOpenModal} />
      <TransactionsContext.Provider value={{ state, setState }}>
        <dialog data-testid="modal" id="modal">
          <NewTransactionModal
            addTransaction={addTransaction}
            validation={validation}
            onClose={handleCloseModal}
            reload={toggleReload}
          />
        </dialog>
        <Summary />

        <TransactionsContainer>
          <SearchForm />

          {state.error ? <LoadError /> : <TransactionsTable />}
        </TransactionsContainer>
      </TransactionsContext.Provider>
    </>
  )
}
