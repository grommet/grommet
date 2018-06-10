import styled from 'styled-components';

const StyledChart = styled.svg`
  display: block;
  max-width: 100%;
  overflow: visible;
`;

export default StyledChart.extend`
  ${props => props.theme.chart && props.theme.chart.extend}
`;
