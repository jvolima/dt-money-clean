import { Header, Summary, NewTransactionModal, SearchForm, LoadError, TransactionsTable, Spinner } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols'
import { type LoadTransactions, type AddTransaction } from '@/domain/usecases'
import { TransactionsContext } from '@/presentation/contexts'
import { LoadContainer, TransactionsContainer } from './styles'
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
    loadData,
    isLoading: false
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
    setState(old => ({ ...old, isLoading: true }))

    loadTransactions.loadAll({ query }).then(data => {
      setState(old => ({
        ...old,
        transactions: data,
        error: '',
        isLoading: false
      }))
    }).catch(() => {
      setState(old => ({
        ...old,
        error: 'Algo de errado aconteceu. Tente novamente em breve.',
        isLoading: false
      }))
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

          {state.error
            ? <LoadError />
            : state.isLoading ? <LoadContainer><Spinner /></LoadContainer> : <TransactionsTable />
          }
        </TransactionsContainer>
      </TransactionsContext.Provider>
    </>
  )
}
