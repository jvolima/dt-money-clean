import styled, { keyframes } from 'styled-components'

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const SpinnerBody = styled.div`
  margin-top: 2rem;
  height: 2rem;
  width: 2rem;
  border: 4px solid #d1d5db;
  border-top-color: ${props => props.theme['green-500']};
  border-radius: 50%;
  animation: ${spinnerAnimation}
    800ms linear infinite;
`
