import styled from 'styled-components';

export const StyledDiagram = styled.svg`
  max-width: 100%;
  width: 100%;
  height: 100%;
`.extend`
  ${props => props.theme.diagram && props.theme.diagram.extend}
`;
