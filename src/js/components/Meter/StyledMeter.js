import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';

const roundStyle = css`
  border-radius: ${props => props.theme.global.edgeSize[props.round.size]};
`;

// overflow: hidden is needed for ie11
export const StyledMeter = styled.svg`
  max-width: 100%;
  overflow: hidden;

  ${genericStyles}
  ${props => props.round && roundStyle}

  path {
    transition: all 0.3s;
  }

  ${props => props.theme.meter && props.theme.meter.extend}
`;
