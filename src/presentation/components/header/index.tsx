import React from 'react'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../newTransactionModal'

export function Header (): JSX.Element {
  function handleOpenModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.showModal()
  }

  function handleCloseModal (): void {
    const dialog = document.getElementById('modal') as HTMLDialogElement
    dialog.close()
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <NewTransactionButton onClick={handleOpenModal}>
          Nova transação
        </NewTransactionButton>

        <dialog id="modal">
          <NewTransactionModal onClose={handleCloseModal} />
        </dialog>
      </HeaderContent>
    </HeaderContainer>
  )
}
