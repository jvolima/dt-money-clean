import React, { useEffect, useState } from 'react'
import { Header, Summary, NewTransactionModal, SearchForm } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols/validation'
import { TransactionsTable, PriceHighlight, TransactionsContainer } from './styles'
import { type LoadTransactions, type AddTransaction } from '@/domain/usecases'

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

        {state.error
          ? <div data-testid="error">
              <span>{state.error}</span>
            </div>
          : (
            <TransactionsTable>
              <tbody data-testid="tbody">
                {state.transactions?.map(transaction => (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant='income'>
                        {transaction.price}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                  </tr>
                ))}
              </tbody>
            </TransactionsTable>
            )}
      </TransactionsContainer>
    </>
  )
}
