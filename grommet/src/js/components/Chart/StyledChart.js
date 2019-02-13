import styled from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledChart = styled.svg`
  display: block;
  max-width: 100%;
  overflow: visible;

  ${genericStyles} ${props => props.theme.chart && props.theme.chart.extend};
`;

StyledChart.defaultProps = {};
Object.setPrototypeOf(StyledChart.defaultProps, defaultProps);

export { StyledChart };
