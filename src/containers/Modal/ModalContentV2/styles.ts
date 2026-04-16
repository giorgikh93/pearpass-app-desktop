import styled from 'styled-components'

type WrapperProps = {
  $borderColor?: string
  $backgroundColor?: string
  $borderRadius?: string
}

export const Wrapper = styled.div<WrapperProps>`
  width: 500px;
  overflow-y: auto;
  padding: 0;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '10px'};
  border: 1px solid
    ${({ theme, $borderColor }) => $borderColor ?? theme.colors.grey300.dark};
  background: ${({ theme, $backgroundColor }) =>
    $backgroundColor ?? theme.colors.grey500.dark};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
`
