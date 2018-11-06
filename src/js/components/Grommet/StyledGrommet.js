import styled, { css } from 'styled-components';

import { baseStyle } from '../../utils';

const fullStyle = css`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

export const StyledGrommet = styled.div`
  ${props => !props.plain && baseStyle}
  ${props => props.full && fullStyle}
  ${props => props.theme.global.font.face}
  ${props => props.theme.grommet.extend}
`;
