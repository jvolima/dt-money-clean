import React, { useState } from 'react'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Inputs, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Input } from '../input'
import { FormContext } from '@/presentation/contexts/form/form-context'

type Props = {
  onClose: () => void
}

export function NewTransactionModal ({ onClose }: Props): JSX.Element {
  const [state] = useState({
    descriptionError: 'Campo obrigatório',
    priceError: 'Campo obrigatório',
    categoryError: 'Campo obrigatório',
    typeError: 'Campo obrigatório'
  })

  return (
    <div>
      <Overlay />

      <Content>
        <h1>Nova transação</h1>

        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <FormContext.Provider value={{ state }}>
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

            <TransactionType title={state.typeError} data-testid="type">
              <TransactionTypeButton variant="income" value="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>

              <TransactionTypeButton variant="outcome" value="outcome">
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <button data-testid="submit" disabled={true} type="submit">
              Cadastrar
            </button>
          </form>
        </FormContext.Provider>
      </Content>
    </div>
  )
}
