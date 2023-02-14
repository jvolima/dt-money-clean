import { TransactionsContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { LoadErrorContainer } from './styles'

export function LoadError (): JSX.Element {
  const { state } = useContext(TransactionsContext)

  return (
    <LoadErrorContainer data-testid="error">
      <span>{state.error}</span>
    </LoadErrorContainer>
  )
}
