import styled from 'styled-components'

export const InputContainer = styled.div`
  position: relative;
  border-bottom: 2px dashed ${props => props.theme['gray-900']};

  &[data-status="valid"] {
    border-bottom-color: ${props => props.theme['green-700']};

    &::after {
      background-color: ${props => props.theme['green-700']};
    }
  }

  &[data-status="invalid"] {
    border-bottom-color: ${props => props.theme['red-500']};

    &::after {
      background-color: ${props => props.theme['red-500']};
    }
  }

  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme['gray-900']};
    position: absolute;
    bottom: -2px;
    left: 0px;
    transform-origin: 0%;
    transform: scaleX(0);
    transition: transform 400ms ease;
  }

  &:focus-within {
    border-color: transparent;
    
    &::after {
      transform: scaleX(1);
    }

    label {
      transform: scale(0.9) translateY(-20px);
    }
  }

  input {
    margin-top: 10px;
    width: 100%;
    line-height: 24px;
    padding: 0px 40px 0px 8px;
    background: transparent;
    border: 0;
    color: ${(props) => props.theme['gray-100']};
    font-size: 1.125rem;

    
    :focus {
      outline: 0;
      box-shadow: 0 0 0 0
    }

    &:not(:placeholder-shown) + label {
      transform: scale(0.9) translateY(-20px);
    } 
  }

  label {
    position: absolute;
    left: 8px;
    font-size: 1.125rem;
    color: ${(props) => props.theme['gray-400']};
    cursor: text;
    transform-origin: 0%;
    transform: translateY(0px);
    transition: transform 400ms ease;
  }
`
