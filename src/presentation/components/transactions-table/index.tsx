import { TransactionsContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { PriceHighlight, TransactionsTableContainer } from './styles'

export function TransactionsTable (): JSX.Element {
  const { state } = useContext(TransactionsContext)

  return (
    <TransactionsTableContainer>
      <tbody data-testid="tbody">
        {state.transactions?.map(transaction => (
          <tr key={transaction.id}>
            <td width="50%">{transaction.description}</td>
            <td>
              <PriceHighlight variant='income'>
                {transaction.price}
              </PriceHighlight>
            </td>
            <td>{transaction.category}</td>
          </tr>
        ))}
      </tbody>
    </TransactionsTableContainer>
  )
}
