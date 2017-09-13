import styled from 'styled-components';

import { backgroundStyle, baseStyle } from '../utils';

const StyledDrop = styled.div`
  ${baseStyle}

  max-height: 0px;
  position: fixed;
  z-index: 20;
  border-radius: ${props => props.theme.global.drop.border.radius};
  overflow: auto;

  ${props => backgroundStyle(
    props.background || props.theme.global.drop.backgroundColor, props.theme
  )}
`;

export default StyledDrop.extend`
  ${props => props.theme.drop && props.theme.drop.extend}
`;
