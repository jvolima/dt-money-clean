import React, { useEffect, useState } from 'react'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Inputs, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Input } from '../input'
import { FormContext } from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protols/validation'
import { FormStatus } from '../form-status'

type Props = {
  validation?: Validation
  onClose: () => void
}

export function NewTransactionModal ({ validation, onClose }: Props): JSX.Element {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    description: '',
    descriptionError: '',
    price: '',
    priceError: '',
    category: '',
    categoryError: '',
    type: '',
    typeError: ''
  })

  useEffect(() => {
    const { description, price, category, type } = state

    const formData = {
      description,
      price,
      category,
      type
    }

    const descriptionError = validation?.validate('description', formData)
    const priceError = validation?.validate('price', formData)
    const categoryError = validation?.validate('category', formData)
    const typeError = validation?.validate('type', formData)

    setState({
      ...state,
      descriptionError,
      priceError,
      categoryError,
      typeError,
      isFormInvalid: !!descriptionError || !!priceError || !!categoryError || !!typeError
    })
  }, [state.description, state.price, state.category, state.type])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    setState({
      ...state,
      isLoading: true
    })
  }

  return (
    <div>
      <Overlay />

      <Content>
        <h1>Nova transação</h1>

        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <FormContext.Provider value={{ state }}>
          <form data-testid="form" onSubmit={handleSubmit}>
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
              <TransactionTypeButton data-testid="income" variant="income" value="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>

              <TransactionTypeButton data-testid="outcome" variant="outcome" value="outcome">
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
              Cadastrar
            </button>
          </form>
          <FormStatus />
        </FormContext.Provider>
      </Content>
    </div>
  )
}
