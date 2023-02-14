import React, { useContext } from 'react'
import { FormContext } from '@/presentation/contexts'
import { Spinner } from '@/presentation/components'
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
