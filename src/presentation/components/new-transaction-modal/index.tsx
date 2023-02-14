import React, { useEffect, useState } from 'react'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { toast, ToastContainer } from 'react-toastify'
import { CloseButton, Content, Inputs, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Input, FormStatus } from '..'
import { FormContext } from '@/presentation/contexts'
import { type Validation } from '@/presentation/protocols/validation'
import { type AddTransaction } from '@/domain/usecases/add-transaction'

type Props = {
  validation: Validation
  addTransaction: AddTransaction
  onClose: () => void
}

export function NewTransactionModal ({ validation, addTransaction, onClose }: Props): JSX.Element {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    description: '',
    descriptionError: '',
    price: '',
    priceError: '',
    category: '',
    categoryError: '',
    type: null,
    typeError: ''
  })

  useEffect(() => {
    const { description, price, category, type } = state

    const formData = {
      description,
      price: Number(price),
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

  function resetForm (): void {
    setState({
      ...state,
      isLoading: false,
      description: '',
      category: '',
      price: '',
      type: null
    })
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (state.isLoading || state.isFormInvalid) {
      return
    }

    setState({
      ...state,
      isLoading: true
    })

    try {
      await addTransaction.add({
        description: state.description,
        price: Number(state.price),
        category: state.category,
        type: state.type,
        createdAt: new Date()
      })

      toast.success('Transação cadastrada.')
      resetForm()
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div>
      <Overlay onClick={onClose} data-testid="overlay" />

      <ToastContainer
        theme="colored"
        toastClassName="errorAlert"
        autoClose={2000}
        pauseOnHover={false}
      />

      <Content>
        <h1>Nova transação</h1>

        <CloseButton data-testid="close-modal-button" onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <FormContext.Provider value={{ state, setState }}>
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

            <TransactionType title={state.typeError} value={state.type} data-testid="type">
              <TransactionTypeButton onClick={() => { setState({ ...state, type: 'income' }) }} data-testid="income" variant="income" value="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>

              <TransactionTypeButton onClick={() => { setState({ ...state, type: 'outcome' }) }} data-testid="outcome" variant="outcome" value="outcome">
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
