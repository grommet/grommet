import styled from 'styled-components';

const StyledChart = styled.svg`
  max-width: 100%;
`;

export default StyledChart.extend`
  ${props => props.theme.chart && props.theme.chart.extend}
`;
