import React, { type FormEvent, useContext, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { TransactionsContext } from '@/presentation/contexts'

export function SearchForm (): JSX.Element {
  const { state } = useContext(TransactionsContext)
  const [query, setQuery] = useState('')

  function handleSearchTransactions (evt: FormEvent): void {
    evt.preventDefault()
    state.loadData(query)
  }

  return (
    <SearchFormContainer onSubmit={handleSearchTransactions}>
      <input
        type="text"
        placeholder="Busque por transações"
        onChange={(evt) => { setQuery(evt.target.value) }}
      />

      <button data-testid="search" type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
