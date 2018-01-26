import styled from 'styled-components';

const StyledDiagram = styled.svg`
  max-width: 100%;
`;

export default StyledDiagram.extend`
  ${props => props.theme.diagram && props.theme.diagram.extend}
`;
