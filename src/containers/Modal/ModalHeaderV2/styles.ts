import styled from 'styled-components'

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.white.mode1};

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:hover {
    opacity: 0.85;
  }
`
