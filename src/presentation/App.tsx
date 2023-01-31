import React from 'react'
import { ThemeProvider } from 'styled-components'
import Transactions from './pages/transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export default function App (): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Transactions />

      <GlobalStyle />
    </ThemeProvider>
  )
}
