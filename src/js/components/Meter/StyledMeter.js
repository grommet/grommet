import styled from 'styled-components';

const StyledMeter = styled.svg`
  max-width: 100%;
`;

export default StyledMeter.extend`
  ${props => props.theme.meter && props.theme.meter.extend}
`;
