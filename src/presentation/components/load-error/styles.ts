import styled from 'styled-components'

export const LoadErrorContainer = styled.div`
  width: 100%;
  height: 24rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  span {
    font-size: 1.25rem;
  }

  button {
    background-color: ${props => props.theme['green-500']};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    padding: 0 1rem;
    border: 0;
    border-radius: 8px;
    font-size: 1.125rem;
    color: ${props => props.theme.white};
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }
`
