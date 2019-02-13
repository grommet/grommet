import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const roundStyle = css`
  border-radius: ${props => props.theme.global.edgeSize[props.round.size]};
`;

// overflow: hidden is needed for ie11
const StyledMeter = styled.svg`
  max-width: 100%;
  overflow: hidden;

  ${genericStyles} ${props => props.round && roundStyle}

  path {
    transition: stroke 0.3s, stroke-width 0.3s;
  }

  ${props => props.theme.meter && props.theme.meter.extend};
`;

StyledMeter.defaultProps = {};
Object.setPrototypeOf(StyledMeter.defaultProps, defaultProps);

export { StyledMeter };
