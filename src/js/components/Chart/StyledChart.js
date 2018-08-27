import styled from 'styled-components';

export const StyledChart = styled.svg`
  display: block;
  max-width: 100%;
  overflow: visible;
`.extend`
  ${props => props.theme.chart && props.theme.chart.extend}
`;
