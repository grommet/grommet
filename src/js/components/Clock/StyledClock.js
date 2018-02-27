import styled, { css, keyframes } from 'styled-components';

export const StyledHour = styled.line`
  stroke-width: ${props => props.theme.clock.analog.hour.width};
  stroke: ${props =>
    props.theme.clock.analog.hour.color[props.grommet.dark ? 'dark' : 'light']};
  transition: stroke 1s ease-out;
`;

export const StyledMinute = styled.line`
  stroke-width: ${props => props.theme.clock.analog.minute.width};
  stroke: ${props =>
    props.theme.clock.analog.minute.color[props.grommet.dark ? 'dark' : 'light']};
  transition: stroke 1s ease-out;
`;

export const StyledSecond = styled.line`
  stroke-width: ${props => props.theme.clock.analog.second.width};
  stroke: ${props =>
    props.theme.clock.analog.second.color[props.grommet.dark ? 'dark' : 'light']};
  transition: stroke 1s ease-out;
`;

export const StyledAnalog = styled.svg`
  width: ${props => props.theme.clock.analog.size[props.size]};
  height: ${props => props.theme.clock.analog.size[props.size]};
`.extend`
  ${props => props.theme.clock.analog && props.theme.clock.analog.extend}
`;

const sizeStyle = (props) => {
  // size is a combination of the level and size properties
  const size = props.size || 'medium';
  const data = props.theme.clock.digital.text[size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

export const StyledDigitalDigit = styled.div`
  position: relative;
  width: 0.8em;
  text-align: center;
  overflow: hidden;
  ${props => sizeStyle(props)}
`;

const previousUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;

const previousDown = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

export const StyledDigitalPrevious = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8em;
  text-align: center;
  animation: ${props => (props.direction === 'down' ? previousDown : previousUp)} 0.5s forwards;
`;

const nextUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const nextDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

export const StyledDigitalNext = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8em;
  text-align: center;
  animation: ${props => (props.direction === 'down' ? nextDown : nextUp)} 0.5s forwards;
`;
