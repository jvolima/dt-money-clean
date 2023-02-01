import React, { useRef } from 'react'
import { InputContainer } from './styles'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>()
  const error = ''

  return (
    <InputContainer
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        data-testid={props.name}
        placeholder=" "
        readOnly
        onFocus={e => { e.target.readOnly = false }}
      />
      <label
        onClick={() => { inputRef.current.focus() }}
        title={error}
      >
        {props.placeholder}
      </label>
    </InputContainer>
  )
}
