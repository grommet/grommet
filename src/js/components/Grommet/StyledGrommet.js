import styled, { css } from 'styled-components';

import { baseStyle } from '../../utils';

const fullStyle = css`
  width: 100vw;
  height: 100vh;
`;

const StyledGrommet = styled.div`
  ${baseStyle}
  ${props => props.full && fullStyle}
  ${props => props.theme.global.font.face}
`;

export default StyledGrommet.extend`
  ${props => props.theme.grommet.extend}
`;
