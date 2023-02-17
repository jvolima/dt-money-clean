import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import 'react-toastify/dist/ReactToastify.min.css'
import { ThemeProvider } from 'styled-components'
import React from 'react'

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
