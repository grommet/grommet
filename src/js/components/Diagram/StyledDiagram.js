import styled from 'styled-components/macro';

import { defaultProps } from '../../default-props';

const StyledDiagram = styled.svg`
  max-width: 100%;
  width: 100%;
  height: 100%;

  ${props => props.theme.diagram && props.theme.diagram.extend};
`;

StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, defaultProps);

export { StyledDiagram };
