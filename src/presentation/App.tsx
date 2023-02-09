import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

type Props = {
  makeTransactions: () => JSX.Element
}

export default function App ({ makeTransactions: MakeTransactions }: Props): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MakeTransactions />
      <GlobalStyle />
    </ThemeProvider>
  )
}
