import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '../spinner'
import { FormStatusContainer } from './styles'

export function FormStatus (): JSX.Element {
  const { state: { isLoading, mainError } } = useContext(FormContext)

  return (
    <FormStatusContainer data-testid="form-status">
      { isLoading && <Spinner /> }
      { mainError && <span data-testid="main-error">{mainError}</span> }
    </FormStatusContainer>
  )
}
