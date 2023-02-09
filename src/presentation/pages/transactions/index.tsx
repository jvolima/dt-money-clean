import { type AddTransaction } from '@/domain/usecases/add-transaction'
import { Header, Summary } from '@/presentation/components'
import { NewTransactionModal } from '@/presentation/components/new-transaction-modal'
import { type Validation } from '@/presentation/protocols/validation'
import React from 'react'

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
    </>
  )
}
