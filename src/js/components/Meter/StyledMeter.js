import styled from 'styled-components';

const StyledMeter = styled.svg`
  max-width: 100%;

  path {
    transition: all 0.3s;
  }
`;

export default StyledMeter.extend`
  ${props => props.theme.meter && props.theme.meter.extend}
`;
