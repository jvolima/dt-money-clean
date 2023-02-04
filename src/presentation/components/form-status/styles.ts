import styled from 'styled-components'

export const FormStatusContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-top: 2rem;
    font-size: 1.125rem;
    font-weight: 700;
    text-align: center;
    color: ${props => props.theme['red-300']};
  }
`
