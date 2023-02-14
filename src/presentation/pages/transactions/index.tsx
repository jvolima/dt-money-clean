import React, { useEffect } from 'react'
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
  function handleOpenModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.showModal()
  }

  function handleCloseModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.close()
  }

  useEffect(() => {
    loadTransactions.loadAll()
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

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Luna Bus</td>
               <td>
                <PriceHighlight variant='income'>
                  R$ 6.000,00
                </PriceHighlight>
              </td>
              <td>Desenvolvimento</td>
              <td>12/02/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
