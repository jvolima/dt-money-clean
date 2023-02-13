import React from 'react'
import { type AddTransaction } from '@/domain/usecases/add-transaction'
import { Header, Summary, NewTransactionModal, SearchForm } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols/validation'
import { TransactionsTable, PriceHighlight, TransactionsContainer } from './styles'

type Props = {
  validation: Validation
  addTransaction: AddTransaction
}

export default function Transactions ({ addTransaction, validation }: Props): JSX.Element {
  function handleOpenModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.showModal()
  }

  function handleCloseModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.close()
  }

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
