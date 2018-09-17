import styled from 'styled-components';

export const StyledWorldMap = styled.svg`
  width: 100%;

  ${props => props.theme.diagram && props.theme.diagram.extend}
`;
