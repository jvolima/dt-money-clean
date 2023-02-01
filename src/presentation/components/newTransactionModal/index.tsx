import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Inputs, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Input } from '../input'

export function NewTransactionModal (): JSX.Element {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <Inputs>
            <Input
              name="description"
              type="text"
              placeholder="Descrição"
              required
            />
            <Input
              name="price"
              type="number"
              placeholder="Preço"
              required
            />
            <Input
              name="category"
              type="text"
              placeholder="Categoria"
              required
            />
          </Inputs>

          <TransactionType>
            <TransactionTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
