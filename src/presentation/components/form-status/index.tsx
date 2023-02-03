import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '../spinner'
import { FormStatusContainer } from './styles'

export function FormStatus (): JSX.Element {
  const { state: { isLoading } } = useContext(FormContext)

  return (
    <FormStatusContainer>
      { isLoading && <Spinner /> }
    </FormStatusContainer>
  )
}
