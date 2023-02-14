import { TransactionsContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { LoadErrorContainer } from './styles'

export function LoadError (): JSX.Element {
  const { state, setState } = useContext(TransactionsContext)

  function reload (): void {
    setState({
      ...state,
      reload: !state.reload
    })
  }

  return (
    <LoadErrorContainer data-testid="error">
      <span>{state.error}</span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </LoadErrorContainer>
  )
}
