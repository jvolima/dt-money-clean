import React, { useEffect, useState } from 'react'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Inputs, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Input } from '../input'
import { FormContext } from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protols/validation'

type Props = {
  validation?: Validation
  onClose: () => void
}

export function NewTransactionModal ({ validation, onClose }: Props): JSX.Element {
  const [state, setState] = useState({
    description: '',
    descriptionError: '',
    priceError: 'Campo obrigatório',
    categoryError: 'Campo obrigatório',
    typeError: 'Campo obrigatório'
  })

  useEffect(() => {
    const { description } = state

    const formData = {
      description
    }

    const descriptionError = validation.validate('description', formData)

    setState({
      ...state,
      descriptionError
    })
  }, [state.description])

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
