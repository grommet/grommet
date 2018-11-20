import styled, { css } from 'styled-components';

import { baseStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const fullStyle = css`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const StyledGrommet = styled.div`
  ${props => !props.plain && baseStyle}
  ${props =>
    !props.plain &&
    props.theme.global.colors.background &&
    css`
      background: ${normalizeColor('background', props.theme, true)};
      color: ${normalizeColor('text', props.theme, true)};
    `}
  ${props => props.full && fullStyle}
  ${props => props.theme.global.font.face}
  ${props => props.theme.grommet.extend}
`;

StyledGrommet.defaultProps = {};
Object.setPrototypeOf(StyledGrommet.defaultProps, defaultProps);

export { StyledGrommet };
