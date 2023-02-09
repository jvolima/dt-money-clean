import React from 'react'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '../../assets/logo.svg'

type Props = {
  handleOpenModal: () => void
}

export function Header ({ handleOpenModal }: Props): JSX.Element {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <NewTransactionButton data-testid="new-transaction-button" onClick={handleOpenModal}>
          Nova transação
        </NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
