import styled from 'styled-components';

import { genericStyles } from '../../utils';

export const StyledChart = styled.svg`
  display: block;
  max-width: 100%;
  overflow: visible;

  ${genericStyles} ${props => props.theme.chart && props.theme.chart.extend};
`;
